const ERROR = {
  REPOSITORY: {
    NOT_FOUND: {
      code: "NOT_FOUND",
      message: "데이터를 찾을 수 없습니다.",
    },
  },
} as const;

type AllowedErrorCodes = keyof (typeof ERROR)[keyof typeof ERROR];

const exchangeCodeForMessage = (error: unknown): string => {
  const errerMessage = (error as Error).message;
  const err = errerMessage as AllowedErrorCodes;
  const layers = Object.keys(ERROR) as Array<keyof typeof ERROR>;
  const matchingLayer = layers.find((layer) => {
    const layerErrors = ERROR[layer];
    return err in layerErrors;
  });
  if (matchingLayer) {
    const layerErrors = ERROR[matchingLayer];
    const errorData = layerErrors[err] as { message: string };
    return errorData.message;
  }
  return "알 수 없는 오류가 발생했습니다: " + err;
};

export { ERROR, exchangeCodeForMessage };
