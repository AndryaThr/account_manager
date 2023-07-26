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

type DataType = {
  acc_id: number;
  acc_user: number;
  acc_name: string;
  acc_uname: string;
  acc_mail?: string;
  acc_token?: string;
  acc_password: string;
  acc_sm: number;
  acc_phone?: string;
  acc_addate: string;
  icon: string;
  platform: string;
  category_id: number;
  folder: string;
  category_fr: string;
  category_eng: string;
  security_questions?: {
    id: number;
    question: string;
    answer: string;
  }[];
};

export type { CategoryType, AccountFormValues, DataType };
