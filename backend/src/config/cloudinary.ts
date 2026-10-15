/** Cloudinary-ready stub — wire credentials via env when ready. */
export const cloudinaryConfig = {
  enabled: Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET,
  ),
};

export async function uploadToCloudinary(_filePath: string): Promise<string | null> {
  if (!cloudinaryConfig.enabled) return null;
  // Integrate cloudinary SDK here when credentials are present.
  return null;
}
