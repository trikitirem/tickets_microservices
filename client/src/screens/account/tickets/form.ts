export enum Fields {
  TITLE = "title",
  PRICE = "price",
}

export type TicketBody = {
  [Fields.TITLE]: string;
  [Fields.PRICE]: number;
};

export const initialValues: TicketBody = {
  title: "",
  price: 0,
};
