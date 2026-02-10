import { test, expect } from '@playwright/test';
test('USP widget mounts', async ({ page }) => {
    await page.goto('/');

    const host = page.locator('#home-usp');
    await expect(host).toBeVisible();
});


test('USP widget finds its slides', async ({ page }) => {
    await page.goto('/');

    const usp = page.locator('[data-usp]');
    await expect(usp).toBeVisible();

    const slides = usp.locator('[data-usp-slide]');
    await expect(slides).toHaveCount(3);

    await expect(slides.first()).toContainText('Over 20 years');
});

test('USP shows one slide only on mobile', async ({ page }) => {
    // Mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/');

    const widget = page
        .locator('[data-usp]')
        .locator('usp-widget');

    // All slides still exist
    const allSlides = widget.locator('[data-usp-slide]');
    await expect(allSlides).toHaveCount(3);

    // Only one is active
    const activeSlides = widget.locator(
        '[data-usp-active="true"]'
    );

    await expect(activeSlides).toHaveCount(1);
    await expect(activeSlides.first()).toBeVisible();
});

test('USP next button activates the next slide on mobile', async ({ page }) => {
    // Mobile viewport FIRST
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/');

    const widget = page
        .locator('[data-usp]')
        .locator('usp-widget');

    // Initial active slide
    const activeBefore = widget.locator('[data-usp-active="true"]');
    await expect(activeBefore).toHaveCount(1);

    const firstText = await activeBefore.first().textContent();

    // Click next
    const nextButton = widget.locator('[data-usp-next]');
    await expect(nextButton).toBeVisible();
    await nextButton.click();

    // New active slide
    const activeAfter = widget.locator('[data-usp-active="true"]');
    await expect(activeAfter).toHaveCount(1);

    const secondText = await activeAfter.first().textContent();

    // Assert state change
    expect(secondText).not.toEqual(firstText);
});

test('USP previous button activates the previous slide on mobile', async ({ page }) => {
    // Mobile viewport first
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const widget = page
        .locator('[data-usp]')
        .locator('usp-widget');

    const nextButton = widget.locator('[data-usp-next]');
    const prevButton = widget.locator('[data-usp-prev]');

    await expect(nextButton).toBeVisible();
    await expect(prevButton).toBeVisible();

    // Capture initial active slide
    const initialActive = widget.locator('[data-usp-active="true"]');
    await expect(initialActive).toHaveCount(1);
    const initialText = await initialActive.first().textContent();

    // Go forward once
    await nextButton.click();

    const afterNext = widget.locator('[data-usp-active="true"]');
    await expect(afterNext).toHaveCount(1);
    const nextText = await afterNext.first().textContent();

    expect(nextText).not.toEqual(initialText);

    // Go back
    await prevButton.click();

    const afterPrev = widget.locator('[data-usp-active="true"]');
    await expect(afterPrev).toHaveCount(1);
    const prevText = await afterPrev.first().textContent();

    // We must be back on the original slide
    expect(prevText).toEqual(initialText);
});

test('USP never has more than one active slide', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const widget = page.locator('[data-usp]').locator('usp-widget');
    const next = widget.locator('[data-usp-next]');
    const prev = widget.locator('[data-usp-prev]');

    for (let i = 0; i < 5; i++) {
        await next.click();
        await expect(widget.locator('[data-usp-active="true"]')).toHaveCount(1);

        await prev.click();
        await expect(widget.locator('[data-usp-active="true"]')).toHaveCount(1);
    }
});

test('USP does not duplicate slides on reload', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const widget = page.locator('[data-usp]').locator('usp-widget');

    await expect(widget.locator('[data-usp-slide]')).toHaveCount(3);

    await page.reload();

    await expect(widget.locator('[data-usp-slide]')).toHaveCount(3);
    await expect(widget.locator('[data-usp-active="true"]')).toHaveCount(1);
});

test('USP desktop mode ignores next and prev', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');

    const widget = page.locator('[data-usp]').locator('usp-widget');

    const slides = widget.locator('[data-usp-slide]');
    await expect(slides).toHaveCount(3);

    // Either all active, or no active flags at all
    await expect(widget.locator('[data-usp-active="true"]')).toHaveCount(0);
});

test('USP supports keyboard navigation on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const widget = page.locator('[data-usp]').locator('usp-widget');
    await widget.focus();

    const first = await widget
        .locator('[data-usp-active="true"]')
        .first()
        .textContent();

    const next = page.locator('[data-usp-next]');
    await next.focus();
    await page.keyboard.press('ArrowRight');

    const second = await widget
        .locator('[data-usp-active="true"]')
        .first()
        .textContent();

    expect(second).not.toEqual(first);
});

test('USP does not make network requests', async ({ page }) => {
    await page.route('**/*', route => {
        const url = route.request().url();
        if (!url.startsWith('file://') && !url.includes('localhost')) {
            throw new Error(`Unexpected request: ${url}`);
        }
        route.continue();
    });

    await page.goto('/');
});
