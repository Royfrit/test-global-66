export const currencies = {
    'peso-chileno': {
        code: 'CLP',
        locale: 'es-CL',
        nombre: 'Peso Chileno',
    },
    'sol-peruano': {
        code: 'PEN',
        locale: 'es-PE',
        nombre: 'Sol Peruano',
    },
};

export function getCurrencyFromSlug(slug) {
    return currencies[slug] || null;
};

export default {
    currencies,
    getCurrencyFromSlug,
};