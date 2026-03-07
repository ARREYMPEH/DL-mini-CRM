const validateMessage = (data) => {
    const { channel, direction, content } = data;
    const errors = [];

    if (!content || content.trim() === '') {
        errors.push("content is required");
    }

    const validChannels = ['WhatsApp', 'Facebook', 'Instagram', 'Website', 'Phone', 'Email', 'Other'];
    if (!channel || !validChannels.includes(channel)) {
        errors.push(`channel is required and must be one of: ${validChannels.join(', ')}`);
    }

    const validDirections = ['Inbound', 'Outbound'];
    if (!direction || !validDirections.includes(direction)) {
        errors.push(`direction is required and must be one of: ${validDirections.join(', ')}`);
    }

    return errors.length > 0 ? errors.join(', ') : null;
};

module.exports = { validateMessage };
