export type Lead = {
  id: string;
  name: string;
  email: string;
  phone?: number;
  stage: string;
  ownerName: string;
  createdDate: string;
  modifiedDate: string;
  imageUrl?: string;
  notes?: string;
};
