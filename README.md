# 🩸 AyudaRed (Client) - Blood Donation Life-Saving Platform

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 📌 Project Overview

AyudaRed is a highly responsive, high-fidelity platform engineered to bridge the critical gap between blood donors and recipients in immediate need. It provides an intuitive, robust, and fast user interface that empowers volunteers, administrators, and donors to orchestrate blood donations efficiently without losing crucial time. Built with a stunning modern design aesthetic, it removes friction from the registration, request, and deployment process of community blood sourcing.

**Live URL:** [AyudaRed](https://ayudared.vercel.app)  
**Backend Repository:** [AyudaRed Server API](https://github.com/toufiqweb/AyudaRed-Server)

## ✨ Key Features

- **Real-Time Request Boards:** Dynamically search and view urgent blood requests based on geographical districts, upazilas, and blood groups.
- **Secure Authentication & Avatars:** Frictionless signup utilizing `better-auth` for JWT token handling alongside `ImgBB` integrations for dynamic user avatars.
- **Comprehensive Dashboards:** Role-specific (Admin, Volunteer, Donor) sidebar dashboards handling table rendering, pagination, and status filters.
- **Advanced Visual Analytics:** Live pie charts and area trends illustrating donation throughput, user growth, and request status metrics via `recharts`.
- **Role-Based Permission Guarding:** Hardened route boundaries restricting mutation requests based on active roles.
- **Micro-Animations & Glassmorphism:** Immersive UI using customized Tailwind classes offering a premium look decoupled from standard, generic templates.

## 🛠 Technologies Used

- **Framework:** Next.js (React)
- **Styling:** Tailwind CSS
- **Authentication:** Better-Auth
- **Data Visualization:** Recharts
- **Icons:** Lucide React & React Icons
- **Image Hosting:** ImgBB API
- **Geographic Data:** Bangladesh Geocode (nuhil)

## 📦 NPM Packages Used

- `next` (v16.2.9)
- `react` / `react-dom` (v19.2.4)
- `better-auth` / `@better-auth/mongo-adapter` (v1.6.19)
- `recharts` (v3.8.1)
- `lucide-react` / `react-icons`
- `framer-motion` (v12.40.0)
- `react-fast-marquee` (v1.6.5)
- `next-themes`

## 📁 Folder Structure

```text
AyudaRed-client/
├── src/
│   ├── app/
│   │   ├── (auth)/         # Sign-in & Sign-up routes
│   │   ├── (main)/         # Public facing routes (Home, Search, Requests)
│   │   ├── api/            # Next.js API Routes / Auth Handlers
│   │   └── dashboard/      # Protected role-based administration panels
│   ├── components/
│   │   ├── dashboard/      # Private dashboard rendering views
│   │   ├── shared/         # Reusable layouts (Navbar, Footer, Providers)
│   │   └── ui/             # Reusable UI elements (Modals, Toasts, Pagination, Errors)
│   ├── lib/
│   │   ├── actions/        # Server actions for data mutations
│   │   ├── api/            # Fetchers querying backend microservices
│   │   ├── core/           # Session management
│   │   └── geoData.js      # Static geographical routing data
```

## ⚙️ Installation Guide

1. **Clone the repository:**

   ```bash
   git clone https://github.com/toufiqweb/AyudaRed.git
   cd AyudaRed-client
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory (see _Environment Variables_ section below).

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` to view the application in the browser.

## 🔑 Environment Variables

You will need to configure the following variables in a `.env` file at the root of your project:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:9000
NEXT_PUBLIC_IMGBB_KEY=your_imgbb_key
BETTER_AUTH_SECRET=your_secret_hash
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string
```

## 🔐 Authentication & Authorization

- Authentication is handled via **Better-Auth** using secure JWT verification cross-referenced with MongoDB.
- API calls requiring mutations pass credentials and rely on backend middleware matching token legitimacy.
- User registration requires an Image upload (managed seamlessly through ImgBB logic), District, Upazila, and Blood Type to ensure system integrity.

## 👥 User Roles

- **Admin (🌐):** Complete visibility. Authorized to block users, elevate roles (make volunteer/admin), view all funding tables, and administrate all donation requests on the platform.
- **Volunteer (🤝):** Restricted operational control. Can monitor all blood donation requests and alter statuses (Pending -> In Progress -> Done/Canceled) but cannot delete records or manage users.
- **Donor (🩸):** General public role. Can view and accept donation requests, edit profile, access personal donation history, and initiate new blood requests.

## 🎯 Main Functionalities

1. **Donor Search Engine:** Query specific blood groups down to the Upazila level. Results are hidden by default to prioritize precision querying.
2. **Tabular Data Tracking:** Robust dashboard handling tables equipped with Status Filtering and Dynamic Pagination.
3. **Workflow Flags:** Requests are funneled through a strict lifecycle: `Pending` → `In Progress` → `Done` / `Canceled`.
4. **Funding Platform:** Allows community members to pledge funds visibly to support organizational infrastructure.

## 📱 Responsive Design Features

- Fully responsive drawer-based sidebar for the dashboard layout on mobile/tablet viewports.
- Fluid grid implementations (`grid-cols-1`, `sm:grid-cols-2`, `lg:grid-cols-3`) ensuring cards stretch uniformly.
- Dynamic hiding of complex table elements to prioritize critical text data on small screens.

## 🛡️ Security Features

- **Frontend Configuration Hiding:** Sensitive API keys (ImgBB) are stored natively in the `.env` configuration.
- **Route Guarding:** Authenticated layouts wrap all `/dashboard` and `/funding` routes, pushing unauthenticated users instantly back to login states without hydration flashes.
- **Restricted Mutability:** Core identifiers, such as the `email` field inside user profiles, are strictly hard-locked to read-only upon successful registration.

## 🚀 Future Improvements

- Interactive Maps integration rendering live requests geographically.
- Real-time WebSockets for instant push-notifications when a request status changes.
- Automated email dispatching upon matching donors to localized emergencies.

## 👨‍💻 Author Information

**Developed By:** Toufiq Alahe
