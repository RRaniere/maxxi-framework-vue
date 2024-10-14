// src/helpers/emailHelpers.ts

export function maskEmail(email: string): string {
    const [name, domain] = email.split('@'); // Divida o email em nome e domínio
    const visibleLength = Math.min(4, name.length); // Exibe os primeiros 4 caracteres ou menos se o nome for menor
    const maskedName = name.slice(0, visibleLength) + '*'.repeat(name.length - visibleLength); // Mascarar o restante
  
    return `${maskedName}@${domain}`;
  }
  