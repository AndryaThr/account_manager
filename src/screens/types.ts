import { NumberBetweenZeroAndFifteen } from "../controller/types";

type CategoryType = {
  id?: NumberBetweenZeroAndFifteen;
  value: string;
  folder: string;
};

type AccountFormValues = {
  name: string;
  username: string;
  mail: string;
  phone: string;
  password: string;
  token?: string;
  category: {
    id?: NumberBetweenZeroAndFifteen;
    label: string;
  };
  platform: {
    icon: string;
    id: number;
    folder?: string;
    label?: string;
  };
  security_question?: {
    id: number;
    question?: string;
    answer?: string;
  }[];
};

export type { CategoryType, AccountFormValues };
