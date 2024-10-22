"use client";

import React from "react";
import { ReactNode } from "react";
import { RecoilRoot } from "recoil";

interface RecoilRootWrapperProps {
    children: ReactNode;
}

export default function RecoilRootWrapper({
    children,
}: RecoilRootWrapperProps) {
    return <RecoilRoot>{children}</RecoilRoot>;
}