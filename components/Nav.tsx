'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, FC } from 'react';
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
} from 'next-auth/react';
import { Profile } from 'next-auth';
import { BuiltInProviderType } from 'next-auth/providers';

const Nav: FC = () => {
  const { data: session } = useSession();
  const [toogleDropdown, setToogleDropdown] = useState<boolean | null>(null);

  const [providers, setProvider] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  const isUserLoggedIn = true; // session?.user ?? false;

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProvider(response);
    };

    setUpProviders();
  }, []);

  return (
    <nav className="w-full flex-between mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptopia Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* desktop navigation */}

      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href={'/create-prompt'} className="black_btn">
              {'Create Prompt'}
            </Link>

            <button
              type="button"
              onClick={() => signOut()}
              className="outline_btn"
            >
              Sing Out
            </button>

            <Link href={'/profile'}>
              <Image
                src={session?.user.image ?? '/assets/icons/no-profile.svg'}
                width={37}
                height={37}
                className="rounded-full"
                alt="Profile image"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: any) => (
                <button
                  type="button"
                  key={provider.id}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* mobile navigation */}
      <div className="sm:hidden flex relative">
        {isUserLoggedIn ? (
          <div className="flex">
            <Image
              src={session?.user.image ?? ''}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToogleDropdown(prev => !prev)}
            />

            {toogleDropdown && (
              <div className="dropdown">
                <Link
                  href={'/profile'}
                  className="dropdown_link"
                  onClick={() => setToogleDropdown(false)}
                >
                  My Profile
                </Link>

                <Link
                  href={'/create-prompt'}
                  className="dropdown_link"
                  onClick={() => setToogleDropdown(false)}
                >
                  Create Prompt
                </Link>

                <button
                  type="button"
                  className="mt-5 w-full black_btn"
                  onClick={() => {
                    setToogleDropdown(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: any) => (
                <button
                  type="button"
                  key={provider.id}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
