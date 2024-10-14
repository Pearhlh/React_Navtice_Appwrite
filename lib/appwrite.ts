import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const config = {
  enpoint: "https://cloud.appwrite.io/v1",
  platform: "com.jsm.aora",
  projectId: "6709cc1e001aecc9530b",
  databaseId: "6709ccfa00269d61ea1e",
  userCollectionId: "6709cd2500367ca54f97",
  videoCollectionId: "6709cd620027caf79f6f",
  storageId: "6709cf110027c10f0534",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.enpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export async function createUser(
  email: string,
  password: string,
  username: string
) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: newAccount.email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error: any) {
    throw new Error(error);
  }
}
export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;
    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId
    );
    return posts.documents;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};
export const getLastestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)] // Apply limit as a separate query
    );
    return posts.documents;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

export const searchPosts = async (query: string) => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.search("title", query)] // Ensure 'title' has a full-text index
    );
    return posts.documents;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};
export const getUserPosts = async (userId: any) => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.equal("creator", userId)]
    );
    return posts.documents;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};
// Upload File
// Upload File
export async function uploadFile(file: any, type: "image" | "video") {
  if (!file) return;

  const {
    mimeType = type === "image" ? "image/png" : "video/quicktime",
    ...rest
  } = file; // Default mimeType if undefined
  const asset = {
    name: file.fileName || `upload.${type === "image" ? "png" : "mov"}`, // Default file name
    type: mimeType,
    size: file.fileSize,
    uri: file.uri,
  };

  try {
    const uploadedFile = await storage.createFile(
      config.storageId,
      ID.unique(),
      asset
    );
    console.log("File uploaded successfully:", uploadedFile);

    // const fileUrl = await getFilePreview(uploadedFile.$id, type);
    // return fileUrl;
  } catch (error: any) {
    throw new Error(`File upload failed: ${error.message}`);
  }
}

// Get File Preview
export async function getFilePreview(fileId: string, type: "image" | "video") {
  let fileUrl: string | undefined;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(config.storageId, fileId).toString();
    } else if (type === "image") {
      fileUrl = storage
        .getFilePreview(
          config.storageId,
          fileId,
          2000,
          2000,
          "top" as any, // Thay vì 'top', sử dụng giá trị hợp lệ với kiểu ImageGravity
          100
        )
        .toString();
    } else {
      console.error("getFilePreview", "Invalid file type");
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw new Error("File URL could not be generated");

    return fileUrl;
  } catch (error: any) {
    throw new Error(`Failed to get file preview: ${error.message}`);
  }
}

// Create Video Post
export async function createVideoPost(form: {
  title?: string;
  video?: string | null;
  thumbnail?: string | null;
  prompt?: string;
  userId: any;
}) {
  try {
    // Upload thumbnail and video files in parallel
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);

    const newPost = await databases.createDocument(
      config.databaseId,
      config.videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      }
    );

    return newPost;
  } catch (error: any) {
    throw new Error(`Failed to create video post: ${error.message}`);
  }
}
