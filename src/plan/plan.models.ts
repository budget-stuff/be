export interface PlanCategiryData {
	category: string;
	expectedWaste: number;
	realWaste: number;
}

export interface PlanData {
	month: string;
	year: string;
	categories: PlanCategiryData[];
	owner: string;
}
