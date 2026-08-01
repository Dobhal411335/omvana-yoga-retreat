import connectDB from "@/lib/connectDB";
import CompanyBasicInfo from "@/models/Admin/CompanyBasicInfo";

function serializeImage(image) {
  return {
    url: image?.url || "",
    key: image?.key || "",
  };
}

function serializeCompanyBasicInfo(record) {
  if (!record) return null;

  return {
    _id: String(record._id),
    id: String(record._id),
    companyName: record.companyName || "",
    companyDomainName: record.companyDomainName || "",
    contactNumbers: Array.isArray(record.contactNumbers)
      ? record.contactNumbers.filter(Boolean)
      : [],
    mainLogo: serializeImage(record.mainLogo),
    footerLogo: serializeImage(record.footerLogo),
    mobileUiLogo: serializeImage(record.mobileUiLogo),
    emails: Array.isArray(record.emails) ? record.emails.filter(Boolean) : [],
    officeAddresses: Array.isArray(record.officeAddresses)
      ? record.officeAddresses.filter(Boolean)
      : [],
    googleAddress: record.googleAddress || "",
    facebookLink: record.facebookLink || "",
    instagramLink: record.instagramLink || "",
    youtubeLink: record.youtubeLink || "",
    googleMapLink: record.googleMapLink || "",
    googleTrackingTag: record.googleTrackingTag || "",
    titleTagForMainLandingPage: record.titleTagForMainLandingPage || "",
    keywords: Array.isArray(record.keywords) ? record.keywords.filter(Boolean) : [],
  };
}

export async function getCompanyBasicInfo() {
  try {
    await connectDB();
    const record = await CompanyBasicInfo.findOne()
      .sort({ updatedAt: -1 })
      .lean();
    return serializeCompanyBasicInfo(record);
  } catch (error) {
    console.error("Failed to load company basic info:", error);
    return null;
  }
}
