# Design system

The interface uses a dark editorial identity with selected paper-white sections. The base colors are black `#000000`, deep maroon `#3D0000`, dark red `#950101`, electric red `#FF0000`, and white `#FFFFFF`. Red is reserved for short emphasis and actions; long body copy uses white or accessible neutral text. CSS variables in `app/assets/css/main.css` define the `--kg-*` brand tokens and semantic Tailwind/shadcn roles.

Space Grotesk carries large editorial headings; Plus Jakarta Sans is used for reading, inputs, and dense product data. Both are self-hosted from Fontsource. Type sizes use `clamp()`, line lengths stay bounded, focus rings remain visible, and controls keep touch-sized hit areas.

Public sections use an intentional black/paper/maroon rhythm and asymmetric editorial compositions. Product and moderation views reduce decoration and focus on status, source, and action. Empty states report when Supabase is not configured rather than showing example metrics or fake employers.

Vue-compatible shadcn-vue components use Reka UI and class-variance-authority. Custom CSS layers keep the identity distinct while semantic tokens make contrast and theme changes consistent. All user-visible copy is Indonesian.
