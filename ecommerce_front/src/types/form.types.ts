import { Step1FormValues } from "@/schemas/step1.schema";
import { Step2FormValues } from "@/schemas/step2.schema";
import { Step3FormValues } from "@/schemas/step3.schema";

export type AllFormData = Step1FormValues & Step2FormValues & Step3FormValues;
