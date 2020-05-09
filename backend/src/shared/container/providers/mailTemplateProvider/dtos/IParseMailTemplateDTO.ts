interface ITemplateDepara {
  [key: string]: string | number;
}

export default interface IParseMailTemplateDTO {
  file: string;
  depara: ITemplateDepara;
}
