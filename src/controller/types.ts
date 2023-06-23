type UserType = {
  user_id: number;
  user_name: string;
  user_firstname: string;
  user_uname: string;
  user_digit: string;
  user_password: string;
  user_private_key: string;
};

type SMType = {
  id: number;
  label_fr: string;
  label_eng: string;
  folder: string;
};

type SMPlatformType = {
  sm_id: number;
  sm_label: string;
  sm_category: number;
  sm_icon: string;
  label_fr: string;
  label_eng: string;
  folder: string;
};

type AccountInformationType = {
  acc_id: number;
  acc_user: number;
  acc_name: string;
  acc_uname: string;
  acc_mail: string;
  acc_token: string;
  acc_password: string;
  acc_sm: number;
  icon: string;
  platform: string;
  category_id: NumberBetweenZeroAndFifteen;
  folder: string;
  category_fr: string;
  category_eng: string;
};

type NumberBetweenZeroAndFifteen =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15;

export {
  UserType,
  SMType,
  AccountInformationType,
  SMPlatformType,
  NumberBetweenZeroAndFifteen,
};
