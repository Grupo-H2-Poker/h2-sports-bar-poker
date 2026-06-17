import {
  MODULO_DEFAULT_MARGIN_BOTTOM,
  MODULO_DEFAULT_MARGIN_TOP,
} from '~/constants/modulo-spacing'
import type { ModuloSpacing } from '~/types/modules'

export function resolveModuloSpacingValue(
  value: string | number | undefined,
  fallback: string | number,
): string {
  const resolved = value ?? fallback

  if (resolved === 0 || resolved === '0') {
    return '0'
  }

  return typeof resolved === 'number' ? `${resolved}px` : resolved
}

export function resolveModuloMargins(
  spacing: ModuloSpacing | undefined,
): { marginTop: string, marginBottom: string } {
  return {
    marginTop: resolveModuloSpacingValue(spacing?.margin_top, MODULO_DEFAULT_MARGIN_TOP),
    marginBottom: resolveModuloSpacingValue(spacing?.margin_bottom, MODULO_DEFAULT_MARGIN_BOTTOM),
  }
}

export function useModuloMargins(
  spacing: MaybeRefOrGetter<ModuloSpacing | undefined>,
) {
  return computed(() => resolveModuloMargins(toValue(spacing)))
}
