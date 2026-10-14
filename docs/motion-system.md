# Motion system

The public landing page uses CSS transforms/opacity and IntersectionObserver for reveal and active-step updates. Scroll remains native. The observer disconnects on unmount; there is no polling loop, layout animation, or scroll interception. The mobile story becomes a short sequence instead of a long pinned scene.

The `motion.client.ts` plugin respects `prefers-reduced-motion`, leaves content visible before hydration, and disconnects old observation targets before scanning each rendered page. It no longer rescans the whole document on every DOM mutation. CSS also makes reveals immediately visible for reduced motion. The hero heading and primary actions render immediately, without entrance animation delays.

Timing is grouped by purpose: about 160–220 ms for control feedback, 250–450 ms for local transitions, and 500–650 ms for one-time editorial reveals. Avoid adding another animation framework unless a concrete component needs capabilities that CSS and the platform APIs cannot provide.

Company section navigation lands directly at the tabs below the sticky navbar after the destination content renders. Browser history restores the saved reading position; direct entry starts at the heading. Pagination reveals the refreshed results and respects reduced motion. Admin editing uses an accessible modal with contained scrolling, focus trapping, and focus restoration to the initiating button.
