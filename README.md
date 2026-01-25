# ReactEdge – USP Widget

A small, embeddable **USP (Unique Selling Points) widget** designed to be safely integrated into existing websites without owning the page or application lifecycle.

This widget is part of the **ReactEdge** initiative: a collection of frontend widgets built with a strong emphasis on isolation, reversibility, and clarity.

---

## What this is

- A lightweight frontend widget for displaying USPs
- Designed to be embedded into existing platforms (e.g. legacy CMS, e-commerce sites)
- Isolated by default (no global CSS or JS leakage)
- Easy to install **and easy to remove**
- Actively used and evolving

---

## What this is NOT

- ❌ A framework
- ❌ A full design system
- ❌ A conversion or growth “hack”
- ❌ A replacement for CMS or backend logic
- ❌ Opinionated about content or marketing strategy

This widget focuses on **delivery and safety**, not business promises.

---

## Design principles

- **Isolation first** – the widget does not assume ownership of the page or application
- **Reversible by design** – removal should leave no trace on the host system
- **Non-hostile to the host** – designed to coexist with existing themes and layouts rather than override them
- **Minimal surface area** – only what is required to do the job
- **Testable in isolation** – behaviour can be verified without the host platform
- **Deferred by default** – does not require early page execution to function
- **Layered structure** – organised to encourage consistency across ReactEdge widgets without enforcing a framework
- **Boring on purpose** – clarity over cleverness

---

## Installation (high level)

The widget is delivered as a standalone JavaScript file and exposed via a custom element.

Typical usage looks like:

```html
<script src="path-to-widget.js"></script>

<reactedge-usp-widget></reactedge-usp-widget>
