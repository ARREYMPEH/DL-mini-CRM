const validateProspect = (data) => {
    const { name, source, status, phone, email } = data;
    const errors = [];

    if (!name || name.trim() === '') {
        errors.push("name is required");
    }

    const validSources = ['WhatsApp', 'Facebook', 'Instagram', 'Website'];
    if (!source || !validSources.includes(source)) {
        errors.push(`source is required and must be one of: ${validSources.join(', ')}`);
    }

    const validStatuses = ['New', 'Contacted', 'In discussion', 'Converted', 'Lost'];
    if (status && !validStatuses.includes(status)) {
        errors.push(`status must be one of: ${validStatuses.join(', ')}`);
    }

    if (!phone && !email) {
        errors.push("At least one contact method must exist: phone or email");
    }

    return errors.length > 0 ? errors.join(', ') : null;
};

module.exports = { validateProspect };
