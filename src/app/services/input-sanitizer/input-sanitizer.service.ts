import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InputSanitizerService {
  constructor() {}

  sanitize(input: string): string {
    return input
      .trim()
      .replace(/<!--.*?-->/gs, '')
      .replace(
        /(SELECT|INSERT|UPDATE|DELETE|FROM|WHERE|;|--|#|\/\*|\*\/)/gi,
        ''
      )
      .replace(/<[^>]*>/g, '')
      .replace(/\s+/g, ' ')
      .replace(/[^\w\sáéíóúÁÉÍÓÚñÑ]/g, '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
}
