export type Lead = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  stage: string;
  amount: number;
  title: string;
  company: string;
  ownerName: string;
  createdDate: Date;
  modifiedDate: Date;
  notes?: string;
};
