export const getAdminBody = (data: { body: string; placeholders }) => {
  const inputs = data.placeholders;
  const body = data.body;

  const newBody = body
    .replace('{firstName}', `${inputs.firstName}`)
    .replace('{lastName}', `${inputs.lastName}`)
    .replace('{userType}', `${inputs.userType}`)
    .replace('{email}', `${inputs.email}`);

  return newBody;
};
