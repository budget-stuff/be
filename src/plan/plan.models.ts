import type { CategoryData } from "../categories/categories.schema.js";

export interface PlanCategiryData {
	category: CategoryData;
	expectedWaste: number;
}

export interface PlanData {
	month: number;
	year: number;
	categories: PlanCategiryData[];
	owner: string;
}
