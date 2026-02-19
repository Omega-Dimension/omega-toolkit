declare module "knayi-myscript" {
  const knayi: {
    fontConvert: (
      text: string,
      from: "zawgyi" | "unicode",
      to: "zawgyi" | "unicode"
    ) => string;
  };

  export default knayi;
}
