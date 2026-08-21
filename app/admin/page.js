"use client";

import { useState, useMemo, useEffect } from "react";
import { useSiteContent } from "@/context/DataContext";
import {
  LayoutDashboard,
  Flame,
  CreditCard,
  Image as ImageIcon,
  Users,
  Settings,
  Save,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  MessageCircle,
  Download,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Search,
  Filter,
  Eye,
  X,
  Sparkles,
  Calendar,
  DollarSign,
  Phone,
  Mail,
  Clock,
  ChevronRight,
  Database,
  Award,
  ShieldCheck,
} from "lucide-react";

export default function AdminDashboardPage() {
  const {
    content,
    transformations,
    applications,
    saveSiteContent,
    updateLeadStatus,
    deleteLead,
    addTransformation,
    updateTransformation,
    deleteTransformation,
    addCertification,
    updateCertification,
    deleteCertification,
    saveCertificationsConfig,
    seedInitialData,
    isFirebaseConnected,
  } = useSiteContent();

  const [activeTab, setActiveTab] = useState("overview"); // overview | hero_workshop | pricing | transformations | leads | settings
  const [toastMessage, setToastMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Editable Form States
  const [heroForm, setHeroForm] = useState({
    eyebrow: content?.hero?.eyebrow || "ONLINE TRANSFORMATION COACHING",
    headlineMain: content?.hero?.headlineMain || "ENGINEER YOUR",
    headlineAccent: content?.hero?.headlineAccent || "STRONGEST SELF.",
    supportingText:
      content?.hero?.supportingText ||
      "Discipline-focused physical conditioning, targeted nutrition architecture, and daily direct accountability designed for high-performers ready for radical transformation.",
    videoSrc: content?.hero?.videoSrc || "/hero.mp4",
  });

  const [workshopForm, setWorkshopForm] = useState({
    title: content?.jalandharWorkshop?.title || "JALANDHAR FITNESS WORKSHOP // EXCLUSIVE IN-PERSON INTAKE",
    date: content?.jalandharWorkshop?.date || "November 8, 2026",
    location: content?.jalandharWorkshop?.location || "Gold's Gym / Elite Training Facility, Model Town, Jalandhar",
    discountBadge: content?.jalandharWorkshop?.discountBadge || "40% OFF FOR WORKSHOP ATTENDEES",
    expiryDate: content?.jalandharWorkshop?.expiryDate || "2026-11-04",
    isActive: content?.jalandharWorkshop?.isActive ?? true,
  });

  const [pricingPackages, setPricingPackages] = useState(
    content?.pricing?.packages || [
      {
        id: "4-weeks",
        name: "4 WEEKS",
        title: "Sprint Kickstart",
        price: "6,999",
        numericPrice: 6999,
        badge: null,
        description: "Ideal for kickstarting fat loss and baseline momentum.",
      },
      {
        id: "8-weeks",
        name: "8 WEEKS",
        title: "Optimal Transformation",
        price: "12,999",
        numericPrice: 12999,
        badge: "MOST POPULAR",
        description: "The gold standard protocol for visible body recomposition.",
      },
      {
        id: "12-weeks",
        name: "12 WEEKS",
        title: "Complete Mastery",
        price: "18,999",
        numericPrice: 18999,
        badge: "BEST VALUE",
        description: "Full physical transformation & biomechanical mastery.",
      },
    ]
  );

  const [settingsForm, setSettingsForm] = useState({
    coachWhatsAppNumber: content?.COACH_WHATSAPP_NUMBER || "919779159169",
    brandName: content?.brand?.name || "AISH MEHAN",
    brandTagline: content?.brand?.tagline || "ELITE ONLINE TRANSFORMATION COACHING",
    applicationFormUrl: content?.APPLICATION_FORM_URL || "#apply",
  });

  // Certifications Form & State
  const certItems = useMemo(() => {
    return content?.certifications?.items || [];
  }, [content]);

  const [certConfigForm, setCertConfigForm] = useState({
    eyebrow: content?.certifications?.eyebrow || "VERIFIED CREDENTIALS & ACCOLADES",
    headlineMain: content?.certifications?.headlineMain || "GLOBALLY ACCREDITED &",
    headlineAccent: content?.certifications?.headlineAccent || "CHAMPIONSHIP PROVEN",
    subheadline:
      content?.certifications?.subheadline ||
      "Every protocol is backed by internationally accredited governing bodies, sports science qualifications, and natural bodybuilding championship titles.",
    stats: content?.certifications?.stats || [
      { label: "CHAMPIONSHIP TITLES", value: "3X CHAMPION", desc: "NPC Miami & Musclemania" },
      { label: "GLOBAL ACCREDITATION", value: "EQF LEVEL 4", desc: "EREPS & EuropeActive" },
      { label: "SPECIALIZATION", value: "ACE & ACSM", desc: "Posture & Corrective Exercise" },
      { label: "PRACTICE STANDARDS", value: "ISO COMPLIANT", desc: "9001 / 14001 / 45001" },
    ],
  });

  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState(null);
  const [certFormData, setCertFormData] = useState({
    title: "",
    category: "championship",
    categoryLabel: "CHAMPIONSHIP TITLE",
    badgeText: "3X USA CHAMPION",
    badgeColor: "gold",
    organization: "",
    credential: "",
    date: "",
    issuingAuthority: "",
    regNo: "",
    image: "/images/Aisa certificate 2022.png",
    highlightsText: "",
    verificationNote: "",
  });

  // Sync form states with live Firestore content when loaded/updated
  useEffect(() => {
    if (content) {
      if (content.hero) {
        setHeroForm((prev) => ({
          ...prev,
          eyebrow: content.hero.eyebrow || prev.eyebrow,
          headlineMain: content.hero.headlineMain || prev.headlineMain,
          headlineAccent: content.hero.headlineAccent || prev.headlineAccent,
          supportingText: content.hero.supportingText || prev.supportingText,
          videoSrc: content.hero.videoSrc || prev.videoSrc,
        }));
      }
      if (content.jalandharWorkshop) {
        setWorkshopForm((prev) => ({
          ...prev,
          title: content.jalandharWorkshop.title || prev.title,
          date: content.jalandharWorkshop.date || prev.date,
          location: content.jalandharWorkshop.location || prev.location,
          discountBadge: content.jalandharWorkshop.discountBadge || prev.discountBadge,
          expiryDate: content.jalandharWorkshop.expiryDate || prev.expiryDate,
          isActive: content.jalandharWorkshop.isActive ?? prev.isActive,
        }));
      }
      if (content.pricing?.packages && content.pricing.packages.length > 0) {
        setPricingPackages(content.pricing.packages);
      }
      if (content.certifications) {
        setCertConfigForm((prev) => ({
          ...prev,
          eyebrow: content.certifications.eyebrow || prev.eyebrow,
          headlineMain: content.certifications.headlineMain || prev.headlineMain,
          headlineAccent: content.certifications.headlineAccent || prev.headlineAccent,
          subheadline: content.certifications.subheadline || prev.subheadline,
          stats: content.certifications.stats || prev.stats,
        }));
      }
      setSettingsForm((prev) => ({
        ...prev,
        coachWhatsAppNumber: content.COACH_WHATSAPP_NUMBER || prev.coachWhatsAppNumber,
        brandName: content.brand?.name || prev.brandName,
        brandTagline: content.brand?.tagline || prev.brandTagline,
        applicationFormUrl: content.APPLICATION_FORM_URL || prev.applicationFormUrl,
      }));
    }
  }, [content]);

  // Transformation Modal State
  const [isTransModalOpen, setIsTransModalOpen] = useState(false);
  const [editingTrans, setEditingTrans] = useState(null);
  const [transFormData, setTransFormData] = useState({
    title: "",
    category: "Fat Loss",
    timeframe: "12 Weeks",
    metrics: "",
    src: "",
    quote: "",
    clientName: "",
  });

  // Leads Filters & Detail Modal
  const [leadSearch, setLeadSearch] = useState("");
  const [leadFilterStatus, setLeadFilterStatus] = useState("all");
  const [selectedLeadModal, setSelectedLeadModal] = useState(null);

  // Toast Helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 4000);
  };

  // Certifications CRUD handlers
  const openNewCertModal = () => {
    setEditingCert(null);
    setCertFormData({
      title: "",
      category: "championship",
      categoryLabel: "CHAMPIONSHIP TITLE",
      badgeText: "CHAMPIONSHIP TITLE",
      badgeColor: "gold",
      organization: "",
      credential: "",
      date: "",
      issuingAuthority: "",
      regNo: "",
      image: "/images/Aisa certificate 2022.png",
      highlightsText: "",
      verificationNote: "",
    });
    setIsCertModalOpen(true);
  };

  const openEditCertModal = (item) => {
    setEditingCert(item);
    setCertFormData({
      title: item.title || "",
      category: item.category || "championship",
      categoryLabel: item.categoryLabel || "CHAMPIONSHIP TITLE",
      badgeText: item.badgeText || "CHAMPIONSHIP TITLE",
      badgeColor: item.badgeColor || "gold",
      organization: item.organization || "",
      credential: item.credential || "",
      date: item.date || "",
      issuingAuthority: item.issuingAuthority || "",
      regNo: item.regNo || "",
      image: item.image || "",
      highlightsText: (item.highlights || []).join("\n"),
      verificationNote: item.verificationNote || "",
    });
    setIsCertModalOpen(true);
  };

  const handleSaveCert = async (e) => {
    e.preventDefault();
    if (!certFormData.title) {
      alert("Please provide a title for the certification.");
      return;
    }

    const payload = {
      title: certFormData.title.trim(),
      category: certFormData.category,
      categoryLabel: certFormData.categoryLabel || "CREDENTIAL",
      badgeText: certFormData.badgeText || "VERIFIED",
      badgeColor: certFormData.badgeColor || "gold",
      organization: certFormData.organization.trim(),
      credential: certFormData.credential.trim(),
      date: certFormData.date.trim(),
      issuingAuthority: certFormData.issuingAuthority.trim(),
      regNo: certFormData.regNo.trim(),
      image: certFormData.image.trim() || "/images/Aisa certificate 2022.png",
      highlights: certFormData.highlightsText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      verificationNote: certFormData.verificationNote.trim(),
    };

    setIsSaving(true);
    if (editingCert) {
      await updateCertification(editingCert.id, payload);
      showToast("Certification record updated!");
    } else {
      await addCertification(payload);
      showToast("New certification added to website!");
    }
    setIsSaving(false);
    setIsCertModalOpen(false);
  };

  const handleDeleteCert = async (id) => {
    if (window.confirm("Are you sure you want to delete this certificate record?")) {
      setIsSaving(true);
      await deleteCertification(id);
      setIsSaving(false);
      showToast("Certificate removed.");
    }
  };

  const handleSaveCertConfig = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const res = await saveCertificationsConfig(certConfigForm);
    setIsSaving(false);
    showToast(res.message || "Credentials header & stats updated!");
  };

  const handleUpdateCertStat = (index, field, value) => {
    const updatedStats = [...certConfigForm.stats];
    updatedStats[index] = { ...updatedStats[index], [field]: value };
    setCertConfigForm({ ...certConfigForm, stats: updatedStats });
  };

  // Save Hero & Workshop Form
  const handleSaveHeroAndWorkshop = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const updated = {
      hero: {
        ...(content?.hero || {}),
        ...heroForm,
      },
      jalandharWorkshop: {
        ...(content?.jalandharWorkshop || {}),
        ...workshopForm,
      },
    };
    const res = await saveSiteContent(updated);
    setIsSaving(false);
    showToast(res.message || "Hero & Workshop updated successfully!");
  };

  // Save Pricing Packages
  const handleSavePricing = async () => {
    setIsSaving(true);
    const updated = {
      pricing: {
        ...(content?.pricing || {}),
        packages: pricingPackages,
      },
    };
    const res = await saveSiteContent(updated);
    setIsSaving(false);
    showToast("Pricing packages updated on live website!");
  };

  const handleUpdatePackageField = (index, field, value) => {
    const updated = [...pricingPackages];
    updated[index] = { ...updated[index], [field]: value };
    setPricingPackages(updated);
  };

  // Save General Settings
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const updated = {
      COACH_WHATSAPP_NUMBER: settingsForm.coachWhatsAppNumber,
      APPLICATION_FORM_URL: settingsForm.applicationFormUrl || "#apply",
      brand: {
        ...(content?.brand || {}),
        name: settingsForm.brandName,
        tagline: settingsForm.brandTagline,
      },
    };
    const res = await saveSiteContent(updated);
    setIsSaving(false);
    showToast("Settings saved successfully!");
  };

  // Seed Database Handler
  const handleSeedDatabase = async () => {
    if (
      window.confirm(
        "Are you sure you want to seed/reset the database with the default site configuration and 9 transformations?"
      )
    ) {
      setIsSaving(true);
      const res = await seedInitialData();
      setIsSaving(false);
      showToast(res.message);
    }
  };

  // Transformation CRUD handlers
  const openNewTransModal = () => {
    setEditingTrans(null);
    setTransFormData({
      title: "",
      category: "Fat Loss",
      timeframe: "12 Weeks",
      metrics: "",
      src: "/images/before after 1.JPG",
      quote: "",
      clientName: "Client",
    });
    setIsTransModalOpen(true);
  };

  const openEditTransModal = (item) => {
    setEditingTrans(item);
    setTransFormData({
      title: item.title || "",
      category: item.category || "Fat Loss",
      timeframe: item.timeframe || "12 Weeks",
      metrics: item.metrics || "",
      src: item.src || "",
      quote: item.quote || "",
      clientName: item.clientName || "",
    });
    setIsTransModalOpen(true);
  };

  const handleSaveTransformation = async (e) => {
    e.preventDefault();
    if (!transFormData.src) {
      alert("Please provide an image URL / path");
      return;
    }

    if (editingTrans) {
      await updateTransformation(editingTrans.id, transFormData);
      showToast("Transformation updated!");
    } else {
      await addTransformation(transFormData);
      showToast("New transformation added to gallery!");
    }
    setIsTransModalOpen(false);
  };

  const handleDeleteTransformation = async (id) => {
    if (window.confirm("Are you sure you want to delete this transformation?")) {
      await deleteTransformation(id);
      showToast("Transformation removed.");
    }
  };

  // Filtered Leads
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesStatus =
        leadFilterStatus === "all" ? true : (app.status || "new") === leadFilterStatus;
      const searchStr = `${app.fullName || ""} ${app.contactNumber || ""} ${app.email || ""} ${app.selectedPackage || ""}`.toLowerCase();
      const matchesSearch = searchStr.includes(leadSearch.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [applications, leadFilterStatus, leadSearch]);

  // Export Leads to CSV
  const handleExportCSV = () => {
    if (!applications || applications.length === 0) {
      alert("No leads found to export.");
      return;
    }

    const headers = [
      "Date",
      "Status",
      "Full Name",
      "Contact Number",
      "Email",
      "Package",
      "Batch Timing",
      "Age",
      "Gender",
      "Weight",
      "Height",
      "Diet Preference",
      "Fitness Goal",
      "Gym Experience",
      "Injuries / Health",
      "Alcohol / Smoke",
    ];

    const rows = applications.map((app) => [
      app.createdAt ? new Date(app.createdAt).toLocaleString() : "",
      app.status || "new",
      `"${(app.fullName || "").replace(/"/g, '""')}"`,
      `"${app.contactNumber || ""}"`,
      `"${app.email || ""}"`,
      `"${app.selectedPackage || ""}"`,
      `"${app.batchTiming || ""}"`,
      app.age || "",
      app.gender || "",
      `"${app.weight || ""}"`,
      `"${app.height || ""}"`,
      `"${app.dietPreference || ""}"`,
      `"${(app.fitnessGoal || "").replace(/"/g, '""')}"`,
      `"${app.gymExperience || ""}"`,
      `"${(app.healthConditions || "").replace(/"/g, '""')}"`,
      `"${app.alcoholSmoke || ""}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `aish_mehan_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-khaki text-near-black px-5 py-3 font-geo font-black text-sm uppercase tracking-wider flex items-center space-x-2 shadow-2xl clip-chamfer-btn animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner Navigation Tabs */}
      <div className="bg-deep-olive/80 border border-muted-olive/60 p-1.5 flex flex-wrap gap-1.5">
        {[
          { id: "overview", label: "Overview", icon: LayoutDashboard },
          { id: "hero_workshop", label: "Hero & Workshop", icon: Flame },
          { id: "pricing", label: "Pricing & Plans", icon: CreditCard },
          { id: "transformations", label: "Transformations", icon: ImageIcon, badge: transformations.length },
          { id: "certifications", label: "Certifications", icon: Award, badge: certItems.length },
          { id: "leads", label: "Leads Inbox", icon: Users, badge: applications.length },
          { id: "settings", label: "Settings & Sync", icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2.5 text-xs font-geo font-bold uppercase tracking-wider transition-all cursor-pointer ${
                isActive
                  ? "bg-khaki text-near-black shadow-glow-khaki font-black"
                  : "text-off-white/80 hover:bg-near-black/60 hover:text-off-white"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  className={`ml-1.5 px-1.5 py-0.2 text-[10px] font-mono rounded ${
                    isActive ? "bg-near-black text-khaki" : "bg-deep-olive text-khaki border border-khaki/30"
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* =========================================================
          TAB 1: OVERVIEW & QUICK METRICS
         ========================================================= */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            <div className="bg-deep-olive/60 border border-muted-olive/60 p-5 clip-chamfer-btn">
              <div className="flex items-center justify-between text-off-white/60 mb-2">
                <span className="text-xs font-mono uppercase tracking-wider">TOTAL LEADS</span>
                <Users className="w-4 h-4 text-khaki" />
              </div>
              <div className="text-3xl font-geo font-black text-off-white">{applications.length}</div>
              <div className="text-[11px] font-mono text-khaki mt-1">Direct Intake Submissions</div>
            </div>

            <div className="bg-deep-olive/60 border border-muted-olive/60 p-5 clip-chamfer-btn">
              <div className="flex items-center justify-between text-off-white/60 mb-2">
                <span className="text-xs font-mono uppercase tracking-wider">NEW (UNCONTACTED)</span>
                <Clock className="w-4 h-4 text-yellow-400" />
              </div>
              <div className="text-3xl font-geo font-black text-yellow-400">
                {applications.filter((a) => (a.status || "new") === "new").length}
              </div>
              <div className="text-[11px] font-mono text-off-white/60 mt-1">Awaiting coach response</div>
            </div>

            <div className="bg-deep-olive/60 border border-muted-olive/60 p-5 clip-chamfer-btn">
              <div className="flex items-center justify-between text-off-white/60 mb-2">
                <span className="text-xs font-mono uppercase tracking-wider">TRANSFORMATIONS</span>
                <ImageIcon className="w-4 h-4 text-khaki" />
              </div>
              <div className="text-3xl font-geo font-black text-off-white">{transformations.length}</div>
              <div className="text-[11px] font-mono text-khaki mt-1">Live Before & After Gallery</div>
            </div>

            <div className="bg-deep-olive/60 border border-muted-olive/60 p-5 clip-chamfer-btn">
              <div className="flex items-center justify-between text-off-white/60 mb-2">
                <span className="text-xs font-mono uppercase tracking-wider">ACCOLADES & CERTS</span>
                <Award className="w-4 h-4 text-khaki" />
              </div>
              <div className="text-3xl font-geo font-black text-off-white">{certItems.length}</div>
              <div className="text-[11px] font-mono text-khaki mt-1">Championships & Credentials</div>
            </div>

            <div className="bg-deep-olive/60 border border-muted-olive/60 p-5 clip-chamfer-btn">
              <div className="flex items-center justify-between text-off-white/60 mb-2">
                <span className="text-xs font-mono uppercase tracking-wider">WORKSHOP CAMPAIGN</span>
                <Flame className="w-4 h-4 text-khaki" />
              </div>
              <div className="text-xl font-geo font-black text-khaki uppercase">
                {workshopForm.isActive ? "ACTIVE & RUNNING" : "PAUSED"}
              </div>
              <div className="text-[11px] font-mono text-off-white/60 mt-1">Jalandhar Event: Nov 8, 2026</div>
            </div>
          </div>

          {/* Quick Action Shortcuts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recent Leads Preview */}
            <div className="bg-deep-olive/40 border border-muted-olive/60 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-geo font-black text-base uppercase text-off-white tracking-wider flex items-center space-x-2">
                  <Users className="w-4 h-4 text-khaki" />
                  <span>RECENT APPLICATION LEADS</span>
                </h3>
                <button
                  onClick={() => setActiveTab("leads")}
                  className="text-xs font-mono text-khaki hover:underline flex items-center space-x-1 uppercase"
                >
                  <span>VIEW ALL</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {applications.length === 0 ? (
                <p className="text-xs font-mono text-off-white/50 py-4">No leads submitted yet.</p>
              ) : (
                <div className="space-y-2">
                  {applications.slice(0, 4).map((lead) => (
                    <div
                      key={lead.id}
                      className="bg-near-black/70 border border-muted-olive/40 p-3 flex items-center justify-between text-xs font-mono"
                    >
                      <div>
                        <div className="text-off-white font-bold">{lead.fullName || "Applicant"}</div>
                        <div className="text-off-white/60 text-[11px]">
                          {lead.selectedPackage || "Package"} • {lead.contactNumber}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-0.5 text-[10px] uppercase font-bold ${
                            lead.status === "enrolled"
                              ? "bg-emerald-950 text-emerald-300 border border-emerald-500/50"
                              : lead.status === "contacted"
                              ? "bg-blue-950 text-blue-300 border border-blue-500/50"
                              : "bg-yellow-950 text-yellow-300 border border-yellow-500/50"
                          }`}
                        >
                          {lead.status || "new"}
                        </span>
                        <button
                          onClick={() => setSelectedLeadModal(lead)}
                          className="px-2 py-1 bg-deep-olive hover:bg-khaki hover:text-near-black text-off-white transition-colors cursor-pointer"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* System Status & DB Controls */}
            <div className="bg-deep-olive/40 border border-muted-olive/60 p-6 space-y-4">
              <h3 className="font-geo font-black text-base uppercase text-off-white tracking-wider flex items-center space-x-2">
                <Database className="w-4 h-4 text-khaki" />
                <span>DATABASE & CMS CONTROLS</span>
              </h3>

              <div className="bg-near-black/70 border border-muted-olive/40 p-4 space-y-3 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-off-white/70">Firestore Connection:</span>
                  <span className={isFirebaseConnected ? "text-emerald-400 font-bold" : "text-yellow-400"}>
                    {isFirebaseConnected ? "CONNECTED (CLOUD)" : "LOCAL CACHE MODE"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-off-white/70">Coach WhatsApp:</span>
                  <span className="text-khaki font-bold">+{settingsForm.coachWhatsAppNumber}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-off-white/70">Active Pricing Plans:</span>
                  <span className="text-off-white">{pricingPackages.length} Packages</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleSeedDatabase}
                  className="flex-1 px-4 py-2.5 bg-deep-olive hover:bg-near-black border border-khaki/60 text-khaki text-xs font-geo font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>SYNC / SEED DEFAULTS</span>
                </button>

                <button
                  onClick={() => setActiveTab("hero_workshop")}
                  className="flex-1 px-4 py-2.5 bg-khaki hover:bg-off-white text-near-black text-xs font-geo font-black uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors cursor-pointer shadow-glow-khaki"
                >
                  <span>EDIT HERO & WORKSHOP</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 2: HERO & JALANDHAR WORKSHOP EDITOR
         ========================================================= */}
      {activeTab === "hero_workshop" && (
        <form onSubmit={handleSaveHeroAndWorkshop} className="space-y-6">
          {/* Hero Section Configuration */}
          <div className="bg-deep-olive/50 border border-muted-olive/60 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-muted-olive/40 pb-3">
              <h3 className="font-geo font-black text-lg uppercase text-off-white tracking-wider flex items-center space-x-2">
                <Flame className="w-5 h-5 text-khaki" />
                <span>1. HERO SECTION CONTENT</span>
              </h3>
              <span className="text-xs font-mono text-khaki uppercase">Homepage Top Fold</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-off-white/80 mb-1.5">
                  Eyebrow Text
                </label>
                <input
                  type="text"
                  value={heroForm.eyebrow}
                  onChange={(e) => setHeroForm({ ...heroForm, eyebrow: e.target.value })}
                  className="w-full px-4 py-2.5 bg-near-black/80 border border-muted-olive/60 text-off-white font-mono text-sm focus:outline-none focus:border-khaki"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-off-white/80 mb-1.5">
                  Background Video Path / URL
                </label>
                <input
                  type="text"
                  value={heroForm.videoSrc}
                  onChange={(e) => setHeroForm({ ...heroForm, videoSrc: e.target.value })}
                  className="w-full px-4 py-2.5 bg-near-black/80 border border-muted-olive/60 text-off-white font-mono text-sm focus:outline-none focus:border-khaki"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-off-white/80 mb-1.5">
                  Main Headline (Line 1)
                </label>
                <input
                  type="text"
                  value={heroForm.headlineMain}
                  onChange={(e) => setHeroForm({ ...heroForm, headlineMain: e.target.value })}
                  className="w-full px-4 py-2.5 bg-near-black/80 border border-muted-olive/60 text-off-white font-mono text-sm focus:outline-none focus:border-khaki"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-off-white/80 mb-1.5">
                  Accent Headline (Line 2 in Khaki)
                </label>
                <input
                  type="text"
                  value={heroForm.headlineAccent}
                  onChange={(e) => setHeroForm({ ...heroForm, headlineAccent: e.target.value })}
                  className="w-full px-4 py-2.5 bg-near-black/80 border border-muted-olive/60 text-off-white font-mono text-sm focus:outline-none focus:border-khaki"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-off-white/80 mb-1.5">
                Supporting Subheadline / Bio Text
              </label>
              <textarea
                rows={3}
                value={heroForm.supportingText}
                onChange={(e) => setHeroForm({ ...heroForm, supportingText: e.target.value })}
                className="w-full px-4 py-2.5 bg-near-black/80 border border-muted-olive/60 text-off-white font-mono text-sm focus:outline-none focus:border-khaki"
              />
            </div>
          </div>

          {/* Jalandhar Workshop Campaign Configuration */}
          <div className="bg-deep-olive/50 border border-muted-olive/60 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-muted-olive/40 pb-3">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-khaki" />
                <h3 className="font-geo font-black text-lg uppercase text-off-white tracking-wider">
                  2. JALANDHAR WORKSHOP PROMO CAMPAIGN
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-xs font-mono uppercase text-off-white/70">Show on Website:</label>
                <input
                  type="checkbox"
                  checked={workshopForm.isActive}
                  onChange={(e) => setWorkshopForm({ ...workshopForm, isActive: e.target.checked })}
                  className="w-4 h-4 accent-khaki cursor-pointer"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-off-white/80 mb-1.5">
                  Campaign Title
                </label>
                <input
                  type="text"
                  value={workshopForm.title}
                  onChange={(e) => setWorkshopForm({ ...workshopForm, title: e.target.value })}
                  className="w-full px-4 py-2.5 bg-near-black/80 border border-muted-olive/60 text-off-white font-mono text-sm focus:outline-none focus:border-khaki"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-off-white/80 mb-1.5">
                  Workshop Date
                </label>
                <input
                  type="text"
                  value={workshopForm.date}
                  onChange={(e) => setWorkshopForm({ ...workshopForm, date: e.target.value })}
                  className="w-full px-4 py-2.5 bg-near-black/80 border border-muted-olive/60 text-off-white font-mono text-sm focus:outline-none focus:border-khaki"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-off-white/80 mb-1.5">
                  Location / Venue
                </label>
                <input
                  type="text"
                  value={workshopForm.location}
                  onChange={(e) => setWorkshopForm({ ...workshopForm, location: e.target.value })}
                  className="w-full px-4 py-2.5 bg-near-black/80 border border-muted-olive/60 text-off-white font-mono text-sm focus:outline-none focus:border-khaki"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-off-white/80 mb-1.5">
                  Discount / Perk Badge
                </label>
                <input
                  type="text"
                  value={workshopForm.discountBadge}
                  onChange={(e) => setWorkshopForm({ ...workshopForm, discountBadge: e.target.value })}
                  className="w-full px-4 py-2.5 bg-near-black/80 border border-muted-olive/60 text-off-white font-mono text-sm focus:outline-none focus:border-khaki"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-off-white/80 mb-1.5">
                Expiry Date (YYYY-MM-DD) — Banner automatically hides after this date
              </label>
              <input
                type="date"
                value={workshopForm.expiryDate}
                onChange={(e) => setWorkshopForm({ ...workshopForm, expiryDate: e.target.value })}
                className="w-full sm:w-64 px-4 py-2.5 bg-near-black/80 border border-muted-olive/60 text-off-white font-mono text-sm focus:outline-none focus:border-khaki"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="px-8 py-3.5 bg-khaki text-near-black font-geo font-black text-sm uppercase tracking-widest clip-chamfer-btn hover:bg-off-white transition-all flex items-center space-x-2 cursor-pointer shadow-glow-khaki disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? "SAVING TO CLOUD..." : "SAVE HERO & WORKSHOP"}</span>
            </button>
          </div>
        </form>
      )}

      {/* =========================================================
          TAB 3: PRICING & PACKAGES EDITOR
         ========================================================= */}
      {activeTab === "pricing" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-geo font-black text-xl uppercase text-off-white tracking-wider flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-khaki" />
                <span>TRANSFORMATION COACHING PACKAGES</span>
              </h3>
              <p className="text-xs font-mono text-off-white/60 mt-1">
                Edit prices, duration titles, highlights, and badges visible on the public site & application modal.
              </p>
            </div>
            <button
              onClick={handleSavePricing}
              disabled={isSaving}
              className="px-6 py-2.5 bg-khaki text-near-black font-geo font-black text-xs uppercase tracking-widest clip-chamfer-btn hover:bg-off-white transition-all flex items-center space-x-2 cursor-pointer shadow-glow-khaki"
            >
              <Save className="w-4 h-4" />
              <span>SAVE ALL PACKAGES</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPackages.map((pkg, idx) => (
              <div
                key={pkg.id || idx}
                className="bg-deep-olive/60 border-2 border-muted-olive/60 p-5 clip-chamfer-btn space-y-4 relative"
              >
                <div className="flex items-center justify-between border-b border-muted-olive/40 pb-2">
                  <span className="font-geo font-bold text-sm text-khaki uppercase tracking-wider">
                    PACKAGE #{idx + 1}
                  </span>
                  <span className="text-[11px] font-mono text-off-white/50">{pkg.id}</span>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-off-white/70 mb-1">
                    Plan Name / Duration
                  </label>
                  <input
                    type="text"
                    value={pkg.name}
                    onChange={(e) => handleUpdatePackageField(idx, "name", e.target.value)}
                    className="w-full px-3 py-2 bg-near-black border border-muted-olive/50 text-off-white font-mono text-xs focus:outline-none focus:border-khaki"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-off-white/70 mb-1">
                    Display Price (INR)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-khaki font-bold text-xs">₹</span>
                    <input
                      type="text"
                      value={pkg.price}
                      onChange={(e) => {
                        const val = e.target.value;
                        const numeric = parseInt(val.replace(/,/g, ""), 10) || 0;
                        const updated = [...pricingPackages];
                        updated[idx] = { ...updated[idx], price: val, numericPrice: numeric };
                        setPricingPackages(updated);
                      }}
                      className="w-full pl-7 pr-3 py-2 bg-near-black border border-muted-olive/50 text-off-white font-mono text-xs focus:outline-none focus:border-khaki"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-off-white/70 mb-1">
                    Subtitle / Title Tag
                  </label>
                  <input
                    type="text"
                    value={pkg.title}
                    onChange={(e) => handleUpdatePackageField(idx, "title", e.target.value)}
                    className="w-full px-3 py-2 bg-near-black border border-muted-olive/50 text-off-white font-mono text-xs focus:outline-none focus:border-khaki"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-off-white/70 mb-1">
                    Highlight Badge (e.g. MOST POPULAR / BEST VALUE)
                  </label>
                  <input
                    type="text"
                    value={pkg.badge || ""}
                    placeholder="None"
                    onChange={(e) => handleUpdatePackageField(idx, "badge", e.target.value || null)}
                    className="w-full px-3 py-2 bg-near-black border border-muted-olive/50 text-off-white font-mono text-xs focus:outline-none focus:border-khaki"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-off-white/70 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={pkg.description || ""}
                    onChange={(e) => handleUpdatePackageField(idx, "description", e.target.value)}
                    className="w-full px-3 py-2 bg-near-black border border-muted-olive/50 text-off-white font-mono text-xs focus:outline-none focus:border-khaki"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 4: TRANSFORMATIONS MANAGER (CRUD)
         ========================================================= */}
      {activeTab === "transformations" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-geo font-black text-xl uppercase text-off-white tracking-wider flex items-center space-x-2">
                <ImageIcon className="w-5 h-5 text-khaki" />
                <span>BEFORE & AFTER TRANSFORMATIONS ({transformations.length})</span>
              </h3>
              <p className="text-xs font-mono text-off-white/60 mt-1">
                Manage client transformation photos, weight loss metrics, timeframes, and testimonials.
              </p>
            </div>

            <button
              onClick={openNewTransModal}
              className="px-5 py-2.5 bg-khaki text-near-black font-geo font-black text-xs uppercase tracking-widest clip-chamfer-btn hover:bg-off-white transition-all flex items-center space-x-2 cursor-pointer shadow-glow-khaki"
            >
              <Plus className="w-4 h-4" />
              <span>ADD NEW TRANSFORMATION</span>
            </button>
          </div>

          {/* Transformations Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {transformations.map((item, idx) => (
              <div
                key={item.id || idx}
                className="bg-deep-olive/50 border border-muted-olive/60 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Image Preview */}
                  <div className="relative aspect-[4/3] bg-near-black w-full overflow-hidden border-b border-muted-olive/50">
                    <img
                      src={item.src}
                      alt={item.title || `Transformation ${idx + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/images/before after 1.JPG";
                      }}
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-near-black/90 border border-khaki text-[10px] font-mono text-khaki uppercase">
                      {item.timeframe || "12 WEEKS"}
                    </div>
                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-deep-olive/90 text-[10px] font-mono text-off-white uppercase">
                      {item.category || "FAT LOSS"}
                    </div>
                  </div>

                  {/* Info Details */}
                  <div className="p-4 space-y-2">
                    <h4 className="font-geo font-bold text-sm text-off-white uppercase">{item.title || `Transformation #${idx + 1}`}</h4>
                    <p className="text-xs font-mono text-khaki font-bold">{item.metrics || "Lost Body Fat & Built Muscle"}</p>
                    {item.quote && (
                      <p className="text-[11px] font-sans text-off-white/70 italic line-clamp-2">
                        "{item.quote}"
                      </p>
                    )}
                    <p className="text-[10px] font-mono text-off-white/40 uppercase">Image: {item.src}</p>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-3 bg-near-black/60 border-t border-muted-olive/40 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-off-white/50">SLIDE #{idx + 1}</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => openEditTransModal(item)}
                      className="p-1.5 bg-deep-olive hover:bg-khaki hover:text-near-black text-off-white transition-colors cursor-pointer"
                      title="Edit Transformation"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteTransformation(item.id)}
                      className="p-1.5 bg-red-950/60 hover:bg-red-800 text-red-300 transition-colors cursor-pointer"
                      title="Delete Transformation"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 5: CERTIFICATIONS & CHAMPIONSHIPS MANAGER (CRUD)
         ========================================================= */}
      {activeTab === "certifications" && (
        <div className="space-y-6">
          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-geo font-black text-xl uppercase text-off-white tracking-wider flex items-center space-x-2">
                <Award className="w-5 h-5 text-khaki" />
                <span>GLOBAL CERTIFICATIONS &amp; ACCOLADES ({certItems.length})</span>
              </h3>
              <p className="text-xs font-mono text-off-white/60 mt-1">
                Manage championship titles, international accreditations, registration numbers, and high-res certificate zoom previews.
              </p>
            </div>

            <button
              onClick={openNewCertModal}
              className="px-5 py-2.5 bg-khaki text-near-black font-geo font-black text-xs uppercase tracking-widest clip-chamfer-btn hover:bg-off-white transition-all flex items-center space-x-2 cursor-pointer shadow-glow-khaki self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>ADD NEW CERTIFICATE</span>
            </button>
          </div>

          {/* Section 1: Section Header & 4 Authority Pillars Editor */}
          <div className="bg-deep-olive/60 border border-muted-olive/60 p-5 clip-chamfer-btn space-y-4">
            <div className="flex items-center justify-between border-b border-muted-olive/40 pb-2">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-khaki" />
                <h4 className="font-geo font-bold text-sm text-khaki uppercase tracking-wider">
                  SECTION HEADINGS &amp; KEY AUTHORITY STATS
                </h4>
              </div>
              <button
                onClick={handleSaveCertConfig}
                disabled={isSaving}
                className="px-4 py-1.5 bg-khaki text-near-black font-geo font-black text-[11px] uppercase tracking-wider clip-chamfer-btn hover:bg-off-white transition-all flex items-center space-x-1.5 cursor-pointer disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isSaving ? "SAVING..." : "SAVE HEADINGS & STATS"}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-off-white/70 mb-1">
                  Eyebrow Tag
                </label>
                <input
                  type="text"
                  value={certConfigForm.eyebrow}
                  onChange={(e) => setCertConfigForm({ ...certConfigForm, eyebrow: e.target.value })}
                  className="w-full px-3 py-2 bg-near-black border border-muted-olive/50 text-off-white font-mono text-xs focus:outline-none focus:border-khaki"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-off-white/70 mb-1">
                  Main Headline
                </label>
                <input
                  type="text"
                  value={certConfigForm.headlineMain}
                  onChange={(e) => setCertConfigForm({ ...certConfigForm, headlineMain: e.target.value })}
                  className="w-full px-3 py-2 bg-near-black border border-muted-olive/50 text-off-white font-mono text-xs focus:outline-none focus:border-khaki"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-off-white/70 mb-1">
                  Accent Headline (Gold)
                </label>
                <input
                  type="text"
                  value={certConfigForm.headlineAccent}
                  onChange={(e) => setCertConfigForm({ ...certConfigForm, headlineAccent: e.target.value })}
                  className="w-full px-3 py-2 bg-near-black border border-muted-olive/50 text-off-white font-mono text-xs focus:outline-none focus:border-khaki"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-off-white/70 mb-1">
                Subheadline Description
              </label>
              <textarea
                rows={2}
                value={certConfigForm.subheadline}
                onChange={(e) => setCertConfigForm({ ...certConfigForm, subheadline: e.target.value })}
                className="w-full px-3 py-2 bg-near-black border border-muted-olive/50 text-off-white font-mono text-xs focus:outline-none focus:border-khaki"
              />
            </div>

            {/* 4 Pillars Grid */}
            <div className="pt-2">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-khaki font-bold mb-2">
                4 Authority Stat Pillars (Displayed on Public Homepage)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {certConfigForm.stats.map((st, idx) => (
                  <div key={idx} className="bg-near-black/70 p-3 border border-muted-olive/40 space-y-2">
                    <span className="text-[10px] font-mono text-khaki font-bold">PILLAR #{idx + 1}</span>
                    <input
                      type="text"
                      placeholder="Label (e.g. SPECIALIZATION)"
                      value={st.label}
                      onChange={(e) => handleUpdateCertStat(idx, "label", e.target.value)}
                      className="w-full px-2 py-1 bg-deep-olive border border-muted-olive/50 text-off-white font-mono text-[11px] focus:outline-none focus:border-khaki"
                    />
                    <input
                      type="text"
                      placeholder="Value (e.g. ACE & ACSM)"
                      value={st.value}
                      onChange={(e) => handleUpdateCertStat(idx, "value", e.target.value)}
                      className="w-full px-2 py-1 bg-deep-olive border border-muted-olive/50 text-khaki font-mono font-bold text-xs focus:outline-none focus:border-khaki"
                    />
                    <input
                      type="text"
                      placeholder="Desc (e.g. Posture & Corrective)"
                      value={st.desc}
                      onChange={(e) => handleUpdateCertStat(idx, "desc", e.target.value)}
                      className="w-full px-2 py-1 bg-deep-olive border border-muted-olive/50 text-off-white/70 font-mono text-[10px] focus:outline-none focus:border-khaki"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Certifications Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certItems.map((item, idx) => {
              const isGold = item.badgeColor === "gold";
              const isBlue = item.badgeColor === "blue";
              const isEmerald = item.badgeColor === "emerald";

              return (
                <div
                  key={item.id || idx}
                  className="bg-deep-olive/50 border border-muted-olive/60 overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* Image / Certificate Preview */}
                    <div className="relative aspect-[4/3] bg-near-black w-full overflow-hidden border-b border-muted-olive/50 p-2 flex items-center justify-center group/prev">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => {
                          e.currentTarget.src = "/images/Aisa certificate 2022.png";
                        }}
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 bg-near-black/90 border border-khaki text-[10px] font-mono text-khaki uppercase font-bold">
                        {item.badgeText || "CERTIFICATE"}
                      </div>
                      <div className="absolute top-2 right-2 px-2 py-0.5 bg-deep-olive/90 text-[10px] font-mono text-off-white uppercase">
                        {item.categoryLabel || item.category || "ACCREDITATION"}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="p-4 space-y-2">
                      <h4 className="font-geo font-bold text-sm text-off-white uppercase leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-xs font-mono text-khaki font-semibold">
                        {item.organization || item.issuingAuthority}
                      </p>
                      <div className="text-[11px] font-mono text-off-white/60 flex items-center justify-between">
                        <span>ID: {item.regNo || "N/A"}</span>
                        <span>{item.date}</span>
                      </div>

                      {/* Highlights */}
                      {item.highlights && item.highlights.length > 0 && (
                        <ul className="text-[11px] font-sans text-off-white/80 space-y-1 border-t border-muted-olive/30 pt-2">
                          {item.highlights.slice(0, 2).map((h, i) => (
                            <li key={i} className="flex items-start space-x-1.5 line-clamp-1">
                              <span className="text-khaki">•</span>
                              <span>{h}</span>
                            </li>
                          ))}
                          {item.highlights.length > 2 && (
                            <li className="text-[10px] font-mono text-khaki">
                              +{item.highlights.length - 2} more verification points
                            </li>
                          )}
                        </ul>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="p-3 bg-near-black/60 border-t border-muted-olive/40 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-off-white/50">RECORD #{idx + 1}</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => openEditCertModal(item)}
                        className="p-1.5 bg-deep-olive hover:bg-khaki hover:text-near-black text-off-white transition-colors cursor-pointer"
                        title="Edit Certificate"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteCert(item.id)}
                        className="p-1.5 bg-red-950/60 hover:bg-red-800 text-red-300 transition-colors cursor-pointer"
                        title="Delete Certificate"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 6: LEADS & APPLICATIONS INBOX
         ========================================================= */}
      {activeTab === "leads" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-geo font-black text-xl uppercase text-off-white tracking-wider flex items-center space-x-2">
                <Users className="w-5 h-5 text-khaki" />
                <span>APPLICATION LEADS INBOX ({applications.length})</span>
              </h3>
              <p className="text-xs font-mono text-off-white/60 mt-1">
                Direct client submissions captured through the 1-on-1 Coaching Application Modal.
              </p>
            </div>

            <button
              onClick={handleExportCSV}
              className="px-4 py-2.5 bg-deep-olive hover:bg-near-black border border-khaki text-khaki text-xs font-geo font-bold uppercase tracking-wider flex items-center space-x-2 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>EXPORT TO CSV</span>
            </button>
          </div>

          {/* Search & Status Filters */}
          <div className="bg-deep-olive/50 border border-muted-olive/60 p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-off-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, phone, email, or package..."
                value={leadSearch}
                onChange={(e) => setLeadSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-near-black border border-muted-olive/50 text-off-white text-xs font-mono placeholder-off-white/30 focus:outline-none focus:border-khaki"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
              {[
                { id: "all", label: "ALL" },
                { id: "new", label: "NEW" },
                { id: "contacted", label: "CONTACTED" },
                { id: "enrolled", label: "ENROLLED" },
                { id: "closed", label: "CLOSED" },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setLeadFilterStatus(filter.id)}
                  className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    leadFilterStatus === filter.id
                      ? "bg-khaki text-near-black font-bold"
                      : "bg-near-black/70 text-off-white/70 hover:text-off-white border border-muted-olive/40"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Leads Table */}
          <div className="bg-deep-olive/40 border border-muted-olive/60 overflow-x-auto">
            {filteredApplications.length === 0 ? (
              <div className="text-center py-12 space-y-2">
                <Users className="w-8 h-8 text-off-white/30 mx-auto" />
                <p className="text-sm font-mono text-off-white/60">No applicants match this criteria.</p>
                <p className="text-xs font-mono text-off-white/40">Test submitting a form on the live site!</p>
              </div>
            ) : (
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead>
                  <tr className="bg-deep-olive border-b border-muted-olive/60 text-off-white/70 uppercase">
                    <th className="py-3 px-4">Applicant</th>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">Package</th>
                    <th className="py-3 px-4">Batch / Timing</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-muted-olive/30">
                  {filteredApplications.map((lead) => {
                    const cleanPhone = (lead.contactNumber || "").replace(/\D/g, "");
                    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                      `Hi ${lead.fullName || "there"}, this is Coach Divesh Mehan following up on your ${lead.selectedPackage || "coaching"} application!`
                    )}`;

                    return (
                      <tr key={lead.id} className="hover:bg-near-black/40 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-off-white">
                          <div>{lead.fullName || "Applicant"}</div>
                          <div className="text-[11px] text-off-white/50 font-normal">{lead.email}</div>
                        </td>
                        <td className="py-3.5 px-4 text-khaki">
                          {lead.contactNumber || "N/A"}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-off-white">
                          {lead.selectedPackage || "Standard"}
                        </td>
                        <td className="py-3.5 px-4 text-off-white/80">
                          {lead.batchTiming || "Morning"}
                        </td>
                        <td className="py-3.5 px-4 text-off-white/60">
                          {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : "Just now"}
                        </td>
                        <td className="py-3.5 px-4">
                          <select
                            value={lead.status || "new"}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                            className={`px-2 py-1 text-[11px] font-bold uppercase rounded border cursor-pointer ${
                              lead.status === "enrolled"
                                ? "bg-emerald-950 text-emerald-300 border-emerald-500/50"
                                : lead.status === "contacted"
                                ? "bg-blue-950 text-blue-300 border-blue-500/50"
                                : lead.status === "closed"
                                ? "bg-red-950 text-red-300 border-red-500/50"
                                : "bg-yellow-950 text-yellow-300 border-yellow-500/50"
                            }`}
                          >
                            <option value="new">NEW</option>
                            <option value="contacted">CONTACTED</option>
                            <option value="enrolled">ENROLLED</option>
                            <option value="closed">CLOSED</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-2">
                          <button
                            onClick={() => setSelectedLeadModal(lead)}
                            className="px-2.5 py-1 bg-deep-olive hover:bg-khaki hover:text-near-black text-off-white transition-colors cursor-pointer"
                          >
                            Details
                          </button>
                          {lead.contactNumber && (
                            <a
                              href={whatsappUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-2 py-1 bg-emerald-700 hover:bg-emerald-600 text-white transition-colors cursor-pointer"
                              title="Chat on WhatsApp"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </a>
                          )}
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete lead for ${lead.fullName}?`)) {
                                deleteLead(lead.id);
                              }
                            }}
                            className="p-1 bg-red-950/60 hover:bg-red-900 text-red-300 transition-colors cursor-pointer"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 6: SETTINGS & DATABASE SYNC
         ========================================================= */}
      {activeTab === "settings" && (
        <div className="space-y-6">
          <form onSubmit={handleSaveSettings} className="bg-deep-olive/50 border border-muted-olive/60 p-6 space-y-4">
            <h3 className="font-geo font-black text-lg uppercase text-off-white tracking-wider flex items-center space-x-2 border-b border-muted-olive/40 pb-3">
              <Settings className="w-5 h-5 text-khaki" />
              <span>GLOBAL SITE & COACH SETTINGS</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-off-white/80 mb-1.5">
                  Coach WhatsApp Number (Without + or spaces)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-khaki absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={settingsForm.coachWhatsAppNumber}
                    onChange={(e) => setSettingsForm({ ...settingsForm, coachWhatsAppNumber: e.target.value })}
                    placeholder="919779159169"
                    className="w-full pl-9 pr-4 py-2.5 bg-near-black/80 border border-muted-olive/60 text-off-white font-mono text-sm focus:outline-none focus:border-khaki"
                  />
                </div>
                <p className="text-[11px] font-mono text-off-white/50 mt-1">
                  All applicant forms and quick chat buttons will direct to this WhatsApp number.
                </p>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-off-white/80 mb-1.5">
                  Brand Tagline
                </label>
                <input
                  type="text"
                  value={settingsForm.brandTagline}
                  onChange={(e) => setSettingsForm({ ...settingsForm, brandTagline: e.target.value })}
                  className="w-full px-4 py-2.5 bg-near-black/80 border border-muted-olive/60 text-off-white font-mono text-sm focus:outline-none focus:border-khaki"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-off-white/80 mb-1.5">
                  Brand Display Name
                </label>
                <input
                  type="text"
                  value={settingsForm.brandName}
                  onChange={(e) => setSettingsForm({ ...settingsForm, brandName: e.target.value })}
                  className="w-full px-4 py-2.5 bg-near-black/80 border border-muted-olive/60 text-off-white font-mono text-sm focus:outline-none focus:border-khaki"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-off-white/80 mb-1.5">
                  Backup / External Application Form URL
                </label>
                <input
                  type="text"
                  value={settingsForm.applicationFormUrl}
                  onChange={(e) => setSettingsForm({ ...settingsForm, applicationFormUrl: e.target.value })}
                  placeholder="#apply (default in-site modal)"
                  className="w-full px-4 py-2.5 bg-near-black/80 border border-muted-olive/60 text-off-white font-mono text-sm focus:outline-none focus:border-khaki"
                />
                <p className="text-[11px] font-mono text-off-white/50 mt-1">
                  Use <code>#apply</code> for the default high-converting intake modal.
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2.5 bg-khaki text-near-black font-geo font-black text-xs uppercase tracking-widest clip-chamfer-btn hover:bg-off-white transition-all flex items-center space-x-2 cursor-pointer shadow-glow-khaki"
              >
                <Save className="w-4 h-4" />
                <span>SAVE SETTINGS</span>
              </button>
            </div>
          </form>

          {/* Seed Database Card */}
          <div className="bg-near-black border-2 border-khaki/40 p-6 space-y-3 clip-chamfer-btn">
            <div className="flex items-center space-x-2 text-khaki">
              <RefreshCw className="w-5 h-5 animate-spin-slow" />
              <h4 className="font-geo font-black text-base uppercase tracking-wider">
                SYNC / SEED FIRESTORE FROM SITEDATA.JS
              </h4>
            </div>
            <p className="text-xs font-mono text-off-white/70 leading-relaxed">
              If your Firestore database is fresh or empty, this tool will automatically copy the full
              content schema (Hero, Workshop, 3 Pricing Plans, and 9 Before & After Transformations) into
              your Firebase database with a single click.
            </p>
            <button
              onClick={handleSeedDatabase}
              disabled={isSaving}
              className="px-6 py-3 bg-deep-olive hover:bg-khaki hover:text-near-black border border-khaki text-khaki font-geo font-bold text-xs uppercase tracking-widest transition-all cursor-pointer"
            >
              SEED INITIAL DATABASE NOW
            </button>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL: ADD / EDIT TRANSFORMATION
         ========================================================= */}
      {isTransModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-near-black border-2 border-khaki w-full max-w-lg p-6 space-y-4 relative clip-chamfer-btn">
            <div className="flex items-center justify-between border-b border-muted-olive/50 pb-3">
              <h4 className="font-geo font-black text-base uppercase text-off-white tracking-wider">
                {editingTrans ? "EDIT TRANSFORMATION" : "ADD NEW TRANSFORMATION"}
              </h4>
              <button onClick={() => setIsTransModalOpen(false)} className="text-off-white/60 hover:text-khaki">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTransformation} className="space-y-3 text-xs font-mono">
              <div>
                <label className="block uppercase text-off-white/70 mb-1">Image URL / Local Path</label>
                <input
                  type="text"
                  placeholder="/images/before after 1.JPG or https://..."
                  value={transFormData.src}
                  onChange={(e) => setTransFormData({ ...transFormData, src: e.target.value })}
                  className="w-full px-3 py-2 bg-deep-olive border border-muted-olive text-off-white focus:outline-none focus:border-khaki"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase text-off-white/70 mb-1">Timeframe / Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. 12 Weeks"
                    value={transFormData.timeframe}
                    onChange={(e) => setTransFormData({ ...transFormData, timeframe: e.target.value })}
                    className="w-full px-3 py-2 bg-deep-olive border border-muted-olive text-off-white focus:outline-none focus:border-khaki"
                  />
                </div>
                <div>
                  <label className="block uppercase text-off-white/70 mb-1">Category</label>
                  <select
                    value={transFormData.category}
                    onChange={(e) => setTransFormData({ ...transFormData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-deep-olive border border-muted-olive text-off-white focus:outline-none focus:border-khaki"
                  >
                    <option value="Fat Loss">Fat Loss</option>
                    <option value="Muscle Gain">Muscle Gain</option>
                    <option value="Recomposition">Recomposition</option>
                    <option value="Athletic">Athletic</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block uppercase text-off-white/70 mb-1">Metrics (e.g. Lost 14kg)</label>
                <input
                  type="text"
                  placeholder="Lost 14 kg & Built Core Density"
                  value={transFormData.metrics}
                  onChange={(e) => setTransFormData({ ...transFormData, metrics: e.target.value })}
                  className="w-full px-3 py-2 bg-deep-olive border border-muted-olive text-off-white focus:outline-none focus:border-khaki"
                />
              </div>

              <div>
                <label className="block uppercase text-off-white/70 mb-1">Client Title / Name</label>
                <input
                  type="text"
                  placeholder="e.g. Executive Client"
                  value={transFormData.clientName}
                  onChange={(e) => setTransFormData({ ...transFormData, clientName: e.target.value })}
                  className="w-full px-3 py-2 bg-deep-olive border border-muted-olive text-off-white focus:outline-none focus:border-khaki"
                />
              </div>

              <div>
                <label className="block uppercase text-off-white/70 mb-1">Client Testimonial Quote</label>
                <textarea
                  rows={2}
                  placeholder="Direct daily accountability made this the only program that actually worked..."
                  value={transFormData.quote}
                  onChange={(e) => setTransFormData({ ...transFormData, quote: e.target.value })}
                  className="w-full px-3 py-2 bg-deep-olive border border-muted-olive text-off-white focus:outline-none focus:border-khaki"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsTransModalOpen(false)}
                  className="px-4 py-2 bg-deep-olive text-off-white uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-khaki text-near-black font-geo font-bold uppercase tracking-wider"
                >
                  Save Transformation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL: VIEW APPLICANT FULL DETAILS
         ========================================================= */}
      {selectedLeadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="bg-near-black border-2 border-khaki w-full max-w-xl p-6 space-y-4 relative clip-chamfer-btn max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-muted-olive/50 pb-3">
              <div>
                <h4 className="font-geo font-black text-lg uppercase text-off-white tracking-wider">
                  APPLICANT DOSSIER // {selectedLeadModal.fullName || "Applicant"}
                </h4>
                <p className="text-xs font-mono text-khaki">
                  Submitted: {selectedLeadModal.createdAt ? new Date(selectedLeadModal.createdAt).toLocaleString() : "Recent"}
                </p>
              </div>
              <button onClick={() => setSelectedLeadModal(null)} className="text-off-white/60 hover:text-khaki">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono text-off-white/90">
              {/* Package & Contact */}
              <div className="bg-deep-olive/70 p-3.5 space-y-1.5 border border-muted-olive/50">
                <p className="text-khaki font-bold uppercase">Program Selected:</p>
                <p className="text-sm font-bold text-off-white">{selectedLeadModal.selectedPackage || "Standard Protocol"}</p>
                <p>• Preferred Timing: {selectedLeadModal.batchTiming || "Morning"}</p>
                <p>• Contact Phone: <strong className="text-khaki">{selectedLeadModal.contactNumber}</strong></p>
                <p>• Email: {selectedLeadModal.email}</p>
              </div>

              {/* Biometrics */}
              <div className="bg-deep-olive/70 p-3.5 space-y-1.5 border border-muted-olive/50">
                <p className="text-khaki font-bold uppercase">Biometrics & Demographics:</p>
                <div className="grid grid-cols-2 gap-2">
                  <p>• Age: {selectedLeadModal.age || "N/A"}</p>
                  <p>• Gender: {selectedLeadModal.gender || "N/A"}</p>
                  <p>• Weight: {selectedLeadModal.weight || "N/A"}</p>
                  <p>• Height: {selectedLeadModal.height || "N/A"}</p>
                </div>
              </div>

              {/* Goals & Lifestyle */}
              <div className="bg-deep-olive/70 p-3.5 space-y-1.5 border border-muted-olive/50">
                <p className="text-khaki font-bold uppercase">Goals, Nutrition & Lifestyle:</p>
                <p>• Fitness Goal: {selectedLeadModal.fitnessGoal || "N/A"}</p>
                <p>• Diet Preference: {selectedLeadModal.dietPreference || "N/A"}</p>
                <p>• Gym Experience: {selectedLeadModal.gymExperience || "N/A"}</p>
                <p>• Alcohol / Smoking: {selectedLeadModal.alcoholSmoke || "N/A"}</p>
                <p>• Injuries / Conditions: {selectedLeadModal.healthConditions || "None"}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                {selectedLeadModal.contactNumber && (
                  <a
                    href={`https://wa.me/${(selectedLeadModal.contactNumber || "").replace(/\D/g, "")}?text=${encodeURIComponent(
                      `Hi ${selectedLeadModal.fullName}, Coach Divesh Mehan here! I reviewed your coaching application for the ${selectedLeadModal.selectedPackage || "program"}...`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-geo font-bold text-center uppercase tracking-wider flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>CHAT ON WHATSAPP</span>
                  </a>
                )}
                <button
                  onClick={() => setSelectedLeadModal(null)}
                  className="px-5 py-2.5 bg-deep-olive border border-muted-olive text-off-white uppercase"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* =========================================================
          MODAL: ADD / EDIT CERTIFICATION
         ========================================================= */}
      {isCertModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
          <div className="bg-near-black border-2 border-khaki w-full max-w-2xl p-6 space-y-4 relative clip-chamfer-btn my-8 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-muted-olive/50 pb-3">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-khaki" />
                <h4 className="font-geo font-black text-base uppercase text-off-white tracking-wider">
                  {editingCert ? "EDIT CERTIFICATION // CREDENTIAL" : "ADD NEW CERTIFICATION // CREDENTIAL"}
                </h4>
              </div>
              <button
                onClick={() => setIsCertModalOpen(false)}
                className="text-off-white/60 hover:text-khaki cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCert} className="space-y-4 text-xs font-mono">
              {/* Row 1: Title */}
              <div>
                <label className="block uppercase text-off-white/80 mb-1">
                  Credential / Championship Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. 3-Time Champion — NPC Miami, USA"
                  value={certFormData.title}
                  onChange={(e) => setCertFormData({ ...certFormData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-deep-olive border border-muted-olive text-off-white focus:outline-none focus:border-khaki font-semibold text-sm"
                  required
                />
              </div>

              {/* Row 2: Category & Badge Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block uppercase text-off-white/80 mb-1">Category Filter</label>
                  <select
                    value={certFormData.category}
                    onChange={(e) => {
                      const cat = e.target.value;
                      let label = "CHAMPIONSHIP TITLE";
                      let badge = "CHAMPION";
                      let color = "gold";
                      if (cat === "medical") {
                        label = "CORRECTIVE & REHAB";
                        badge = "ACE & ACSM APPROVED";
                        color = "blue";
                      } else if (cat === "accreditation") {
                        label = "GLOBAL ACCREDITATION";
                        badge = "CERTIFIED";
                        color = "emerald";
                      }
                      setCertFormData({
                        ...certFormData,
                        category: cat,
                        categoryLabel: label,
                        badgeText: badge,
                        badgeColor: color,
                      });
                    }}
                    className="w-full px-3 py-2 bg-deep-olive border border-muted-olive text-off-white focus:outline-none focus:border-khaki"
                  >
                    <option value="championship">Championship Titles</option>
                    <option value="medical">Corrective &amp; Rehab</option>
                    <option value="accreditation">Global Accreditations</option>
                  </select>
                </div>

                <div>
                  <label className="block uppercase text-off-white/80 mb-1">Badge Tag Text</label>
                  <input
                    type="text"
                    placeholder="e.g. 3X USA CHAMPION"
                    value={certFormData.badgeText}
                    onChange={(e) => setCertFormData({ ...certFormData, badgeText: e.target.value })}
                    className="w-full px-3 py-2 bg-deep-olive border border-muted-olive text-off-white focus:outline-none focus:border-khaki uppercase"
                  />
                </div>

                <div>
                  <label className="block uppercase text-off-white/80 mb-1">Badge Theme Color</label>
                  <select
                    value={certFormData.badgeColor}
                    onChange={(e) => setCertFormData({ ...certFormData, badgeColor: e.target.value })}
                    className="w-full px-3 py-2 bg-deep-olive border border-muted-olive text-off-white focus:outline-none focus:border-khaki"
                  >
                    <option value="gold">Gold / Khaki (Championships)</option>
                    <option value="blue">Electric Blue (Corrective/Rehab)</option>
                    <option value="emerald">Emerald Green (Accreditations)</option>
                    <option value="khaki">Khaki Tactical</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Organization & Credential */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase text-off-white/80 mb-1">Issuing Body / Organization</label>
                  <input
                    type="text"
                    placeholder="e.g. National Physique Committee (NPC) USA"
                    value={certFormData.organization}
                    onChange={(e) => setCertFormData({ ...certFormData, organization: e.target.value })}
                    className="w-full px-3 py-2 bg-deep-olive border border-muted-olive text-off-white focus:outline-none focus:border-khaki"
                  />
                </div>

                <div>
                  <label className="block uppercase text-off-white/80 mb-1">Credential Record Subtitle</label>
                  <input
                    type="text"
                    placeholder="e.g. 3-Time Championship Titleholder — NPC Miami, Florida"
                    value={certFormData.credential}
                    onChange={(e) => setCertFormData({ ...certFormData, credential: e.target.value })}
                    className="w-full px-3 py-2 bg-deep-olive border border-muted-olive text-off-white focus:outline-none focus:border-khaki"
                  />
                </div>
              </div>

              {/* Row 4: Registration ID, Date & Issuing Authority */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block uppercase text-off-white/80 mb-1">Reg / License / Certificate ID</label>
                  <input
                    type="text"
                    placeholder="e.g. NPC-USA-MIA-3X or CES062989"
                    value={certFormData.regNo}
                    onChange={(e) => setCertFormData({ ...certFormData, regNo: e.target.value })}
                    className="w-full px-3 py-2 bg-deep-olive border border-muted-olive text-off-white focus:outline-none focus:border-khaki uppercase"
                  />
                </div>

                <div>
                  <label className="block uppercase text-off-white/80 mb-1">Date / Validity Term</label>
                  <input
                    type="text"
                    placeholder="e.g. Awarded 25th July 2026"
                    value={certFormData.date}
                    onChange={(e) => setCertFormData({ ...certFormData, date: e.target.value })}
                    className="w-full px-3 py-2 bg-deep-olive border border-muted-olive text-off-white focus:outline-none focus:border-khaki"
                  />
                </div>

                <div>
                  <label className="block uppercase text-off-white/80 mb-1">Authority Signatory</label>
                  <input
                    type="text"
                    placeholder="e.g. Louis Zwick (President)"
                    value={certFormData.issuingAuthority}
                    onChange={(e) => setCertFormData({ ...certFormData, issuingAuthority: e.target.value })}
                    className="w-full px-3 py-2 bg-deep-olive border border-muted-olive text-off-white focus:outline-none focus:border-khaki"
                  />
                </div>
              </div>

              {/* Row 5: Certificate Image URL & Quick Presets */}
              <div>
                <label className="block uppercase text-off-white/80 mb-1">
                  Certificate High-Res Image URL / Path <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="/images/Aisa certificate 2022.png or custom image URL"
                  value={certFormData.image}
                  onChange={(e) => setCertFormData({ ...certFormData, image: e.target.value })}
                  className="w-full px-3 py-2 bg-deep-olive border border-muted-olive text-off-white focus:outline-none focus:border-khaki mb-1.5"
                  required
                />
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] uppercase text-off-white/50">Quick Presets:</span>
                  {[
                    { label: "NPC Miami Trophy", path: "/images/npc-miami-champion.jpg" },
                    { label: "Musclemania Asia", path: "/images/Aisa certificate 2022.png" },
                    { label: "Prehab 121 CES", path: "/images/certificate of completion.png" },
                    { label: "EREPS Level 4", path: "/images/EREPS certificate.png" },
                    { label: "Musclemania India", path: "/images/muscle mania india.png" },
                    { label: "Classic Fitness CFA", path: "/images/class fitness academy.png" },
                  ].map((preset) => (
                    <button
                      type="button"
                      key={preset.path}
                      onClick={() => setCertFormData({ ...certFormData, image: preset.path })}
                      className="px-2 py-0.5 bg-deep-olive hover:bg-khaki hover:text-near-black border border-muted-olive text-[10px] text-off-white/70 transition-colors cursor-pointer"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 6: Bullet Highlights */}
              <div>
                <label className="block uppercase text-off-white/80 mb-1">
                  Key Verification Highlights (One bullet point per line)
                </label>
                <textarea
                  rows={3}
                  placeholder={`1st Place Gold Medal Champion across all competitors\n100% Lifetime Natural & Drug-Free Standard\nOfficial Verifiable Credential`}
                  value={certFormData.highlightsText}
                  onChange={(e) => setCertFormData({ ...certFormData, highlightsText: e.target.value })}
                  className="w-full px-3 py-2 bg-deep-olive border border-muted-olive text-off-white focus:outline-none focus:border-khaki"
                />
              </div>

              {/* Row 7: Verification Note */}
              <div>
                <label className="block uppercase text-off-white/80 mb-1">
                  Verification Note / Official Statement
                </label>
                <input
                  type="text"
                  placeholder="e.g. Official Certificate of Recognition by Musclemania International"
                  value={certFormData.verificationNote}
                  onChange={(e) => setCertFormData({ ...certFormData, verificationNote: e.target.value })}
                  className="w-full px-3 py-2 bg-deep-olive border border-muted-olive text-off-white focus:outline-none focus:border-khaki"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-3 border-t border-muted-olive/50">
                <button
                  type="button"
                  onClick={() => setIsCertModalOpen(false)}
                  className="px-4 py-2.5 bg-deep-olive hover:bg-near-black text-off-white uppercase cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 bg-khaki text-near-black font-geo font-bold uppercase tracking-wider hover:bg-off-white transition-all cursor-pointer shadow-glow-khaki disabled:opacity-50"
                >
                  {isSaving ? "Saving..." : editingCert ? "Update Certificate" : "Add Certificate"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
