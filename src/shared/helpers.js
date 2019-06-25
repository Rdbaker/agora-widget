const COOKIE_NAME = 'AGORA_AUTH';

export const expireToken = () => {
  document.cookie = `${COOKIE_NAME}=;expires=${(new Date()).toUTCString()};`;
};

export const getCookie = () => {
  const startIndex = document.cookie.indexOf(COOKIE_NAME);
  if (startIndex === -1) {
    return getCookieFromLocalStorage();
  }
  const startSlice = startIndex + COOKIE_NAME.length + 1;
  const endIndex = document.cookie.slice(startIndex).indexOf(';');
  if (endIndex === -1) {
    return document.cookie.slice(startSlice);
  } else {
    return document.cookie.slice(startSlice, startIndex + endIndex);
  }
};

const getCookieFromLocalStorage = () => {
  try {
    return localStorage.getItem(COOKIE_NAME);
  } catch (err) {
    return null;
  }
}

export const setCookie = ({ token }) => {
  const expireDate = new Date();
  expireDate.setDate(expireDate.getDate() + 7);

  const cookie = `${COOKIE_NAME}=${token};expires=${expireDate.toGMTString()};path=/;domain=${document.domain}`;
  document.cookie = cookie;
  try {
    localStorage.setItem(COOKIE_NAME, token);
  } catch (err) {
    console.info('agora could not store token to localStorage');
  }
};

export const isMobile = () => window.innerWidth < 600;
export const isTablet = () => window.innerWidth > 600 && window.innerWidth < 768;
export const isDesktop = () => window.innerWidth > 768;
export const isPortraitMode = () => window.innerHeight > window.innerWidth;

export const allowedAttrTypes = ['STRING', 'NUMBER', 'BOOLEAN', 'JSON']

// TODO: use a library for this
export const makeDomainMatcher = (actualDomain) => {
  const [ actualHost, actualPort ] = actualDomain.split(':');
  const actualDomainParts = actualHost.split('.');
  return (allowedDomain) => {
    const [ allowedHost, allowedPort ] = allowedDomain.split(':');

    // check the ports first if both are there
    if (allowedPort && actualPort && allowedPort !== actualPort) {
      return false;
    }

    const allowedDomainParts = allowedHost.split('.');
    const matched = allowedDomainParts.length && allowedDomainParts.reduceRight((matchedSoFar, part, index) => matchedSoFar && part === actualDomainParts[index], true);
    return matched;
  }
}