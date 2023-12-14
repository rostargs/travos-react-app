import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { collection, getDocs, addDoc, updateDoc, doc, getDoc } from "firebase/firestore";
import { db, imagesDB } from "../../firebase";
import { TSendState } from "../slices/questionSlice";
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";

export type TTest = {
  id: string;
  image: File;
  name: string;
  questions: TSendState[];
};

type TPostTest = Omit<TTest, "id">;

export const testApi = createApi({
  reducerPath: "db",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Tests"],
  endpoints: (builder) => ({
    getTests: builder.query<TTest[], void>({
      async queryFn() {
        try {
          const testsRef = collection(db, "tests");
          const querySnapshot = await getDocs(testsRef);
          const tasks: TTest[] = [];

          querySnapshot.forEach((test) => tasks.push({ id: test.id, ...test.data() } as TTest));

          return { data: tasks };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      providesTags: ["Tests"],
    }),
    postTest: builder.mutation<null, TPostTest>({
      async queryFn(test) {
        try {
          const { image, ...rest } = test;

          const testsRef = collection(db, "tests");
          const addedDoc = await addDoc(testsRef, rest);
          const imageStorageRef = ref(imagesDB, `test/${image.name}`);
          const uploadImage = uploadBytesResumable(imageStorageRef, image);

          await uploadBytes(imageStorageRef, image);

          const downloadURL = await getDownloadURL(uploadImage.snapshot.ref);

          await updateDoc(doc(testsRef, addedDoc.id), {
            image: downloadURL,
          });

          return { data: null };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      invalidatesTags: ["Tests"],
    }),

    getTestByID: builder.query<TTest, string>({
      queryFn: async (id) => {
        try {
          const testsRef = collection(db, "tests");
          const testDocument = doc(testsRef, id);
          const test = (await getDoc(testDocument)).data() as TTest;
          return { data: test };
        } catch (error: any) {
          return { error: error.message };
        }
      },
    }),
  }),
});

export const { useGetTestsQuery, usePostTestMutation, useGetTestByIDQuery } = testApi;
