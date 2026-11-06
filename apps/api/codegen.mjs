export default {
  schema: "src/hygraph/schema.graphql",
  documents: "src/hygraph/operations/*.graphql",
  generates: {
    "src/hygraph/generated/operations.ts": {
      plugins: ["typescript-operations", "typed-document-node"],
      config: {
        useTypeImports: true,
        enumType: "string-literal",
        skipTypename: true,
        avoidOptionals: {field: true, inputValue: false},
        defaultScalarType: "unknown",
        scalars: { RichTextAST: "@lift-lab/shared-types#RichContent", JSON: "unknown", DateTime: "string", Date: "string", Long: "number", Hex: "string", RGBAHue: "number", RGBATransparency: "number" },
      },
    },
  },
};
