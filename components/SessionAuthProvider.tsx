"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

type ProviderType = {
	children: ReactNode;
	session: Session | null | undefined;
};

const SessionProviderAuth = ({ children, session }: ProviderType) => {
	return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default SessionProviderAuth;
