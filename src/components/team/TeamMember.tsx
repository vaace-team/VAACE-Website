'use client';

import React from 'react';
import Image from 'next/image';
import { FiExternalLink } from 'react-icons/fi';
import styles from './team.module.scss';
import type { TeamMember } from '@/app/utils/readCsv';

export default function TeamMember(member: TeamMember) {
  return (
    <div className={styles.teamMemberCard}>
      {/* Left: Headshot Image Container */}
      <div className={styles.avatarContainer}>
        <a 
          href={member.linkedin || '#'} 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.avatarLink}
        >
          <div className={styles.avatarImage}>
            <Image
              src={member.headshot || '/team_images/default-avatar.jpg'}
              alt={member.name}
              fill
              sizes="120px"
              style={{ objectFit: 'cover' }}
              onError={(e) => {
                e.currentTarget.src = '/team_images/default-avatar.jpg';
              }}
            />
          </div>
          {member.linkedin && (
            <span className={styles.externalIcon}>
              <FiExternalLink />
            </span>
          )}
        </a>
      </div>

      {/* Right: Info Section */}
      <div className={styles.memberInfo}>
        <h3 className={styles.memberName}>{member.name}</h3>
        {member.school && <p className={styles.school}>{member.school}</p>}
        
        {member.subteams && member.subteams.length > 0 && (
          <div className={styles.tags}>
            {member.subteams.map((subteam) => (
              <span key={subteam} className={styles.tag}>
                {subteam}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}