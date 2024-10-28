const ERROR = {
  REPOSITORY: {
    NOT_FOUND: {
      code: "NOT_FOUND",
      message: "데이터를 찾을 수 없습니다.",
    },
  },
  USE_CASE: {
    INVALID_LOG_IN_CREDENTIALS: {
      code: "INVALID_LOG_IN_CREDENTIALS",
      message: "잘못된 이메일 또는 비밀번호입니다.",
    },
    SIGN_IN_FAIL: {
      code: "SIGN_IN_FAIL",
      message: "로그인에 실패했습니다.",
    },
    CANNOT_READ_PROFILE: {
      code: "CANNOT_READ_PROFILE",
      message: "프로필을 읽을 수 없습니다.",
    },
    FAIL_TO_SIGN_UP: {
      code: "FAIL_TO_SIGN_UP",
      message: "회원가입에 실패했습니다.",
    },
    SIGN_OUT_FAIL: {
      code: "SIGN_OUT_FAIL",
      message: "로그아웃에 실패했습니다.",
    },
  },
  INFRASTRUCTURE: {},
  SERVICE: {},
  ENTITY: {},
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
