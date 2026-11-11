# MAMTA MATTRESSES REPAIRING SERVICE
### Premium At-Home Mattress Repair & Restoration — Pune, Maharashtra, India

A high-performance, modern web application and booking platform designed for **Mamta Mattresses Repairing Service**, featuring a **Minimalist + Soft Claymorphism** design system, full WhatsApp integration, headless WordPress REST API bridge, and an at-home repair enquiry management system.

---

## 1. Business Information & Core Rules

- **Business Name:** MAMTA MATTRESSES REPAIRING SERVICE
- **Phone:** 8412937878 (`+91 8412937878`)
- **Email:** SATISHLASHKAR219@GMAIL.COM
- **Location:** Pune, Maharashtra, India
- **Operating Hours:** Monday to Sunday: 9:00 AM – 8:00 PM
- **Business Model:** 100% AT-HOME MATTRESS REPAIR SERVICE

### Crucial Business Rules
1. **Technician visits the customer's home:** All diagnostic inspections, foam replacements, coil adjustments, and stitching occur inside the customer's home.
2. **NO pickup or delivery service:** Mattresses are never transported away or held in a remote workshop.
3. **No pickup/delivery booking options:** The booking flow strictly books a technician visit to the customer's doorstep.
4. **Enquiry, not auto-confirmation:** Each booking generates a unique reference code (`MMR-2026-XXXX`). The customer is explicitly notified: *"Your appointment request has been received. Our team will contact you to confirm availability."*

---

## 2. Design System: Minimalist + Soft Claymorphism

### Color Palette
- **Background:** `#F7F8F4` (Soft Cream / Warm White)
- **Primary Green:** `#176B52` (Deep Forest Jade)
- **Secondary Green:** `#DCEBE2` (Pale Mint Mist)
- **Soft Sage:** `#EAF1E8` (Light Herbaceous Sage)
- **White:** `#FFFFFF` (Pure Card Surface)
- **Text:** `#202824` (Deep Charcoal Green)
- **Muted Text:** `#718078` (Slate Green)
- **Accent:** `#B8DCC5` (Fresh Spring Accent)

### Claymorphism UI Elements
- **Clay Cards:** Soft rounded corners (`rounded-3xl`), dual-shadow depth (`8px 14px 28px rgba(23, 107, 82, 0.05), -6px -6px 18px rgba(255, 255, 255, 0.95)`), smooth micro-lift on hover.
- **Clay Buttons:** Pill-shaped tactile buttons with subtle inner highlight and drop shadows.
- **Recessed Clay Inputs:** Inset bevels (`box-shadow: inset 2px 2px 5px rgba(...)`) for a calm, friendly form-filling experience.
- **Typography:** Plus Jakarta Sans & Manrope.

---

## 3. Implemented Pages & Features

| Page / Feature | Description |
|---|---|
| **Home Page** | Hero section with Pune trust badges, 6 top services preview, 4-step at-home process, why choose us cards, interactive before/after comparison slider, customer reviews preview, and direct booking form. |
| **Our Services** | Complete searchable and category-filtered catalogue of all **25 services** across 5 categories with "Book This Service" pre-selection and WhatsApp enquiry. |
| **About Us** | Business philosophy, doorstep craftsmanship commitment, material transparency, and clean home etiquette. |
| **Customer Reviews** | Verified reviews, DEMO markers during development, customer review submission modal, and star ratings. |
| **Book a Repair** | Comprehensive multi-field booking form with Indian 10-digit phone validation, future-date appointment selector, 40+ Pune localities, photo upload previews, reference generation (`MMR-2026-XXXX`), and confetti celebration. |
| **Contact Us** | Direct call button (`tel:8412937878`), WhatsApp link, enquiry form, and embedded Google Maps coverage of Pune. |
| **Privacy Policy** | Complete compliance document detailing customer data privacy. |
| **Terms & Conditions** | Clear contractual terms documenting the doorstep service model and quotation process. |
| **Admin Portal** | Business owner portal for managing customer booking requests (filter by status, update status, call customer, WhatsApp prefilled response, export to CSV), review moderation, and WordPress connection testing. |
| **Floating WhatsApp** | Persistent bottom-right floating button with gentle pulse animation, tooltips, and pre-filled quick enquiries. |
| **Custom 404** | User-friendly error recovery page with home and booking shortcuts. |

---

## 4. Complete Services Portfolio (25 Services)

### Category 1: Mattress Repair
1. Mattress Sagging Repair
2. Mattress Spring Repair
3. Mattress Sidewall Repair
4. Mattress Edge Support Repair
5. Mattress Stitching & Seam Repair

### Category 2: Foam & Comfort Solutions
6. Mattress Foam Replacement
7. Memory Foam Replacement
8. Mattress Layer Replacement
9. Mattress Thickness Upgrade
10. Mattress Firmness Adjustment
11. Mattress Softness / Hardness Modification

### Category 3: Mattress Customization
12. Mattress Resizing
13. Mattress Size Modification
14. Custom Mattress Making
15. Custom Foam Cutting
16. Mattress Topper Customization

### Category 4: Restoration & Fabric
17. Old Mattress Restoration
18. Used Mattress Renovation
19. Mattress Cover Replacement
20. Mattress Fabric Replacement

### Category 5: Cleaning & Hygiene
21. Mattress Deep Cleaning
22. Mattress Stain Removal
23. Mattress Odour Removal
24. Mattress Sanitization
25. Mattress Dust Removal

---

## 5. Technology Stack

- **Framework:** React 18 with TypeScript
- **Bundler & Dev Server:** Vite 5
- **Styling:** Tailwind CSS with custom Claymorphism utility classes
- **Icons:** Lucide React
- **Animations & Delight:** Canvas Confetti, Framer Motion ready, native CSS transitions
- **Backend CMS:** WordPress REST API (Headless mode) with automatic fallback data layer
- **Local Storage:** Automatic offline-first persistence for bookings and customer reviews

---

## 6. WordPress Headless CMS Setup

The website is architected to work with **WordPress as a headless CMS** through its native REST API.

### When WordPress is Connected:
- Services are loaded dynamically from the `mmr_service` custom post type.
- Customer reviews submitted on the frontend save directly as `pending` posts in the `mmr_review` custom post type.
- Booking requests are posted to `/wp-json/mmr/v1/bookings` and immediately email the business owner at `SATISHLASHKAR219@GMAIL.COM`.

### When WordPress is NOT Connected (Local Fallback Mode):
- The site runs **100% autonomously** using the built-in local catalogue and mock data layer.
- Enquiries and reviews are saved securely in browser storage.
- The business owner can manage enquiries, update statuses, trigger WhatsApp messages, and export records to CSV directly in the **Admin Portal** (`#admin`).
- A status badge in the footer/admin transparently reports the connection state.

### Ready-to-Use WordPress Plugin:
The repository includes a ready-to-deploy single-file WordPress plugin located at:
`src/wordpress-plugin/mamta-mattress-headless.php`

#### How to install it in WordPress:
1. Log in to your WordPress server (via cPanel, FTP, or SSH).
2. Create a folder: `wp-content/plugins/mamta-mattress-headless/`
3. Copy `src/wordpress-plugin/mamta-mattress-headless.php` into that directory.
4. Go to **WordPress Admin → Plugins** and click **Activate** on *Mamta Mattresses Headless REST Bridge*.
5. Custom post types for Services, Reviews, and Bookings will appear in your admin sidebar.

---

## 7. Environment Variables

Configure these in `.env` (or in your hosting provider's dashboard):

```env
# Business Contact Settings
VITE_BUSINESS_NAME="Mamta Mattresses Repairing Service"
VITE_BUSINESS_PHONE="8412937878"
VITE_BUSINESS_EMAIL="SATISHLASHKAR219@GMAIL.COM"
VITE_BUSINESS_WHATSAPP="918412937878"
VITE_BUSINESS_CITY="Pune, Maharashtra, India"

# Headless WordPress Integration (Optional)
VITE_WORDPRESS_URL="https://your-wordpress-domain.com"
VITE_WORDPRESS_API_URL="https://your-wordpress-domain.com/wp-json"
VITE_WORDPRESS_AUTH_METHOD="application-passwords"
```

---

## 8. Development & Build Commands

```bash
# 1. Install dependencies
npm install

# 2. Run local development server (runs on http://localhost:5173)
npm run dev

# 3. Compile production build
npm run build

# 4. Preview the production build locally
npm run preview
```

---

## 9. Deployment Instructions

### Deploy to Vercel
1. Push this repository to GitHub or GitLab.
2. In Vercel, click **Add New Project** and import the repository.
3. Framework Preset: **Vite**.
4. Root Directory: `mamta-mattress-repair` (or root `./`).
5. Build Command: `npm run build`.
6. Output Directory: `dist`.
7. Add any desired environment variables (e.g. `VITE_WORDPRESS_URL`) and click **Deploy**.

### Deploy to Netlify
1. Create a `netlify.toml` or connect via GitHub.
2. Build command: `npm run build`.
3. Publish directory: `dist`.

### Deploy to Hostinger / cPanel / Shared Hosting
1. Run `npm run build` locally.
2. Compress the contents of the `dist/` folder into a ZIP file.
3. Upload and extract the files directly into your domain's `public_html/` directory.

---

## 10. SEO & Local Schema Implementation

- **Structured Data:** Embedded Schema.org `LocalBusiness` / `HomeAndConstructionBusiness` in `index.html` detailing coordinates for Pune, phone `+918412937878`, email `SATISHLASHKAR219@GMAIL.COM`, and weekly opening hours (09:00 - 20:00).
- **Target Keywords:** Naturally targeted in headings and metadata:
  - *Mattress Repair in Pune*
  - *Mattress Repairing Service Pune*
  - *Mattress Foam Replacement Pune*
  - *Mattress Spring Repair Pune*
  - *At-Home Mattress Repair Pune*
  - *Mattress Restoration Pune*
- **Sitemap & Robots:** Located at `/sitemap.xml` and `/robots.txt`.

---

© 2026 MAMTA MATTRESSES REPAIRING SERVICE. All Rights Reserved.
