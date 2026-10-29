import React from 'react';
// 1. Yahan createAvatar ki jagah Avatar as DiceBearAvatar aayega
import { Avatar as DiceBearAvatar } from '@dicebear/core';
import { botttsNeutral, initials } from '@dicebear/collection';

import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface GeneratedAvatarProps {
  seed: string;
  variant: 'botttsNeutral' | 'initials';
  className?: string;
}

export const GeneratedAvatar = ({ seed, variant, className }: GeneratedAvatarProps) => {
  let avatar;

  if (variant === 'botttsNeutral') {
    // 2. createAvatar(...) ki jagah new DiceBearAvatar(...)
    avatar = new DiceBearAvatar(botttsNeutral, {
      seed,
    });
  } else {
    // 3. Yahan bhi new DiceBearAvatar(...)
    avatar = new DiceBearAvatar(initials, {
      seed,
      fontWeight: 500,
      fontSize: 42,
    });
  }

  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={avatar.toDataUri()} alt="Avatar" />
      <AvatarFallback>
        {seed.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

export default GeneratedAvatar;