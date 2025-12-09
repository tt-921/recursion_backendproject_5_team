import { atom } from "jotai";
import type { User } from "@/types/authTypes";

export const userAtom = atom<User | null>(null);
