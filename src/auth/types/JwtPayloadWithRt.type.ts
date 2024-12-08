import { JwtPayload } from "./JwtPayload.type";

export type JwtPayloadWithRt = JwtPayload & { refreshToken: string };