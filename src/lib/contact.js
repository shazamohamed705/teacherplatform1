export const CONTACT = {
  whatsapp: 'https://wa.me/201023313853',
  phone: '01023313853',
  email: 'Wahaj.official.2025@gmail.com',
};

export const CONTACT_EVENT = 'wahaj:open-contact';

// Any component can open the single <ContactModal /> mounted in App.
export const openContact = () => window.dispatchEvent(new Event(CONTACT_EVENT));
