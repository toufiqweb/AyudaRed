"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Loader2,
  Image as ImageIcon,
  MapPin,
  Heart,
  Droplet,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { imageUpload } from "@/lib/imageUpload";
import { authClient } from "@/lib/auth-client";
import { useToast } from "@/components/ui/Toast";
import { upazilas, districtsList } from "@/lib/geoData";

export default function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/dashboard";
  const toast = useToast();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Controlled Inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  const [availableUpazilas, setAvailableUpazilas] = useState([]);
  const [errors, setErrors] = useState({});

  // Validations
  const validateName = (val) => {
    if (!val) return "Name is required";
    if (val.length < 3) return "Name must be at least 3 characters";
    if (val.length > 50) return "Please enter a valid name";
    if (/^\d+$/.test(val)) return "Please enter a valid name";
    return "";
  };

  const validateEmail = (val) => {
    if (!val) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val)) return "Please enter a valid email address";
    return "";
  };

  const validatePassword = (val) => {
    if (!val) return "Password is required";
    if (val.length < 6) return "Password must be at least 6 characters";
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(val)) return "Password must contain uppercase, lowercase and a number";
    return "";
  };

  const validateConfirmPassword = (pass, confirm) => {
    if (!confirm) return "Confirm password is required";
    if (pass !== confirm) return "Passwords do not match";
    return "";
  };

  const validateImage = (file) => {
    if (!file) return "Profile image is required";
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) return "Only JPG, PNG and WEBP images are allowed";
    if (file.size > 5 * 1024 * 1024) return "Image size must be less than 5MB";
    return "";
  };

  const validateBloodGroup = (val) => val ? "" : "Please select a blood group";
  const validateDistrict = (val) => val ? "" : "Please select a district";
  const validateUpazila = (val) => val ? "" : "Please select an upazila";

  // Change Handlers
  const handleNameChange = (e) => {
    const val = e.target.value;
    setName(val);
    if (errors.name) setErrors((p) => ({ ...p, name: validateName(val) }));
  };

  const handleEmailChange = (e) => {
    const val = e.target.value.trim();
    setEmail(val);
    if (errors.email) setErrors((p) => ({ ...p, email: validateEmail(val) }));
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    if (errors.password) setErrors((p) => ({ ...p, password: validatePassword(val) }));
    if (errors.confirmPassword) setErrors((p) => ({ ...p, confirmPassword: validateConfirmPassword(val, confirmPassword) }));
  };

  const handleConfirmPasswordChange = (e) => {
    const val = e.target.value;
    setConfirmPassword(val);
    if (errors.confirmPassword) setErrors((p) => ({ ...p, confirmPassword: validateConfirmPassword(password, val) }));
  };

  const handleBloodGroupChange = (e) => {
    const val = e.target.value;
    setBloodGroup(val);
    if (errors.bloodGroup) setErrors((p) => ({ ...p, bloodGroup: validateBloodGroup(val) }));
  };

  const handleDistrictChange = (e) => {
    const val = e.target.value;
    setSelectedDistrict(val);
    if (val && upazilas[val]) {
      setAvailableUpazilas(upazilas[val]);
    } else {
      setAvailableUpazilas([]);
    }
    setUpazila(""); 
    if (errors.district) setErrors((p) => ({ ...p, district: validateDistrict(val) }));
  };

  const handleUpazilaChange = (e) => {
    const val = e.target.value;
    setUpazila(val);
    if (errors.upazila) setErrors((p) => ({ ...p, upazila: validateUpazila(val) }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file || null);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      if (errors.image) setErrors((p) => ({ ...p, image: validateImage(file) }));
    } else {
      setImagePreview(null);
    }
  };

  // Blur Handlers
  const handleBlur = (field) => {
    switch (field) {
      case "name": setErrors((p) => ({ ...p, name: validateName(name) })); break;
      case "email": setErrors((p) => ({ ...p, email: validateEmail(email) })); break;
      case "password": setErrors((p) => ({ ...p, password: validatePassword(password) })); break;
      case "confirmPassword": setErrors((p) => ({ ...p, confirmPassword: validateConfirmPassword(password, confirmPassword) })); break;
      case "bloodGroup": setErrors((p) => ({ ...p, bloodGroup: validateBloodGroup(bloodGroup) })); break;
      case "district": setErrors((p) => ({ ...p, district: validateDistrict(selectedDistrict) })); break;
      case "upazila": setErrors((p) => ({ ...p, upazila: validateUpazila(upazila) })); break;
      case "image": setErrors((p) => ({ ...p, image: validateImage(imageFile) })); break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      name: validateName(name),
      email: validateEmail(email),
      password: validatePassword(password),
      confirmPassword: validateConfirmPassword(password, confirmPassword),
      bloodGroup: validateBloodGroup(bloodGroup),
      district: validateDistrict(selectedDistrict),
      upazila: validateUpazila(upazila),
      image: validateImage(imageFile),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err !== "")) {
      return;
    }

    setLoading(true);

    try {
      let uploadedImage = null;
      if (imageFile) {
        uploadedImage = await imageUpload(imageFile);
      }

      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name,
        image: uploadedImage?.url,
        role: "donor",
        status: "active",
        bloodGroup,
        district: selectedDistrict,
        upazila,
      });

      if (data) {
        toast.success("Registration successful!");
        router.push(redirectUrl);
        router.refresh();
      }
      if (error) {
        toast.error("This email is already registered");
      }
    } catch (err) {
      console.error("SignUp Error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-background text-foreground overflow-x-hidden">
      {/* ================= LEFT SIDE: SaaS Brand & Value Panel ================= */}
      <div className="hidden lg:flex w-1/2 relative bg-secondary border-r border-border p-16 flex-col justify-between overflow-hidden">
        {/* Subtle Decorative Grid Pattern & Radial Glow */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-15" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />

        {/* Top: Branding */}
        <div className="relative z-10">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold font-heading tracking-tight text-foreground"
          >
            <Droplet className="w-6 h-6 text-primary fill-primary transform rotate-180" />
            <span className="font-semibold text-base sm:text-lg tracking-tight font-heading">
              Ayuda<span className="text-primary font-heading">Red</span>
            </span>
          </Link>
        </div>

        {/* Center: Hero SaaS Copy */}
        <div className="relative z-10 max-w-lg space-y-6 my-auto">
          <h2 className="text-4xl xl:text-5xl font-bold text-foreground leading-[1.15] tracking-tight font-heading">
            Empowering the life-saving network,{" "}
            <span className="text-primary">one drop</span> at a time.
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed max-w-md">
            Join thousands of active donors. Manage donation requests instantly
            with our real-time smart matching dashboard.
          </p>

          {/* SaaS Feature Checklist */}
          <div className="space-y-3 pt-4">
            {[
              "Real-time global donor search",
              "Instant matching with local requests",
              "Secure and decentralized data privacy",
            ].map((text, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 text-sm font-medium opacity-90"
              >
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: Footer / Micro-copy */}
        <div className="relative z-10 text-xs text-muted-foreground">
          © {new Date().getFullYear()} AyudaRed Platform. All rights reserved.
        </div>
      </div>

      {/* ================= RIGHT SIDE: Sign Up Form Scrollable Container ================= */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-4 sm:px-8 lg:px-16 xl:px-24 py-12 overflow-y-auto">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex gap-2 items-center">
              <h1 className="text-3xl font-bold tracking-tight text-foreground font-heading">
                Join as a Donor{" "}
              </h1>
              <Droplet className="w-6 h-6 text-primary fill-primary transform rotate-180" />
            </div>
            <p className="text-sm text-muted-foreground">
              Create your account to start managing requests and saving lives
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Profile Picture Upload Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                Profile Avatar
              </label>
              <div className="flex items-center gap-4 w-full bg-secondary border border-border p-3.5 rounded-xl transition hover:border-border/80">
                <div className="w-14 h-14 rounded-full border-2 border-border bg-background flex items-center justify-center overflow-hidden flex-shrink-0">
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      width={120}
                      height={120}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="w-5 h-5 opacity-40 text-foreground" />
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="cursor-pointer text-xs font-bold py-1.5 px-3 bg-background border border-border rounded-lg text-foreground hover:bg-muted transition shadow-sm block w-max">
                    Choose File
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      onBlur={() => handleBlur("image")}
                      className="hidden"
                      disabled={loading}
                      aria-invalid={!!errors.image}
                      aria-describedby="image-error"
                      required
                    />
                  </label>
                  <span className="text-[11px] text-muted-foreground truncate max-w-[200px]">
                    {imagePreview ? "✓ Image selected" : "JPEG, PNG up to 5MB"}
                  </span>
                </div>
              </div>
              {errors.image && (
                <p id="image-error" className="text-red-500 text-xs mt-1">
                  {errors.image}
                </p>
              )}
            </div>

            {/* Full Name Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
                <input
                  type="text"
                  name="name"
                  required
                  value={name}
                  onChange={handleNameChange}
                  onBlur={() => handleBlur("name")}
                  aria-invalid={!!errors.name}
                  aria-describedby="name-error"
                  placeholder="John Doe"
                  className="w-full pl-11 pr-4 py-3 bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                  disabled={loading}
                />
              </div>
              {errors.name && (
                <p id="name-error" className="text-red-500 text-xs mt-1">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
                <input
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={() => handleBlur("email")}
                  aria-invalid={!!errors.email}
                  aria-describedby="email-error"
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                  disabled={loading}
                />
              </div>
              {errors.email && (
                <p id="email-error" className="text-red-500 text-xs mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Blood Group Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                Blood Group
              </label>
              <div className="relative">
                <Heart className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary fill-primary/20 pointer-events-none" />
                <select
                  name="blood_group"
                  required
                  value={bloodGroup}
                  onChange={handleBloodGroupChange}
                  onBlur={() => handleBlur("bloodGroup")}
                  aria-invalid={!!errors.bloodGroup}
                  aria-describedby="bloodGroup-error"
                  className="w-full pl-11 pr-10 py-3 bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition appearance-none cursor-pointer"
                  disabled={loading}
                >
                  <option value="" disabled>
                    Select your blood group
                  </option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-40 text-xs">
                  ▼
                </div>
              </div>
              {errors.bloodGroup && (
                <p id="bloodGroup-error" className="text-red-500 text-xs mt-1">
                  {errors.bloodGroup}
                </p>
              )}
            </div>

            {/* Dynamic Cascading Location Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                  District
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50 pointer-events-none" />
                  <select
                    name="district"
                    required
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                    onBlur={() => handleBlur("district")}
                    aria-invalid={!!errors.district}
                    aria-describedby="district-error"
                    className="w-full pl-11 pr-10 py-3 bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition appearance-none cursor-pointer"
                    disabled={loading}
                  >
                    <option value="" disabled>
                      Select District
                    </option>
                    {districtsList.map((d) => (
                      <option key={d.value} value={d.value}>
                        {d.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-40 text-xs">
                    ▼
                  </div>
                </div>
                {errors.district && (
                  <p id="district-error" className="text-red-500 text-xs mt-1">
                    {errors.district}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                  Upazila
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50 pointer-events-none" />
                  <select
                    name="upazila"
                    required
                    value={upazila}
                    onChange={handleUpazilaChange}
                    onBlur={() => handleBlur("upazila")}
                    aria-invalid={!!errors.upazila}
                    aria-describedby="upazila-error"
                    className="w-full pl-11 pr-10 py-3 bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition appearance-none cursor-pointer disabled:opacity-40"
                    disabled={loading || !selectedDistrict}
                  >
                    <option value="" disabled>
                      {!selectedDistrict
                        ? "Choose District First"
                        : availableUpazilas.length === 0
                          ? "No upazilas mapped"
                          : "Select Upazila"}
                    </option>
                    {availableUpazilas.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-40 text-xs">
                    ▼
                  </div>
                </div>
                {errors.upazila && (
                  <p id="upazila-error" className="text-red-500 text-xs mt-1">
                    {errors.upazila}
                  </p>
                )}
              </div>
            </div>

            {/* Password Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={password}
                    onChange={handlePasswordChange}
                    onBlur={() => handleBlur("password")}
                    aria-invalid={!!errors.password}
                    aria-describedby="password-error"
                    placeholder="••••••••"
                    className="w-full pl-11 pr-10 py-3 bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-80 transition"
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p id="password-error" className="text-red-500 text-xs mt-1">
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirm_password"
                    required
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    onBlur={() => handleBlur("confirmPassword")}
                    aria-invalid={!!errors.confirmPassword}
                    aria-describedby="confirmPassword-error"
                    placeholder="••••••••"
                    className="w-full pl-11 pr-10 py-3 bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-80 transition"
                    disabled={loading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p id="confirmPassword-error" className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-95 active:scale-[0.99] transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-primary/15"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Registering profile...
                </>
              ) : (
                "Sign Up As Donor"
              )}
            </button>
          </form>

          {/* Bottom Link */}
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href={searchParams.get("redirect") ? `/sign-in?redirect=${encodeURIComponent(searchParams.get("redirect"))}` : "/sign-in"}
              className="text-primary hover:underline font-semibold transition"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
