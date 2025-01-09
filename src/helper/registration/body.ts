export const getBody = (data: { body: string; placeholders }) => {
  const inputs = data.placeholders;
  const body = data.body;

  const newBody = body
    .replace('{firstName}', `${inputs.firstName}`)
    .replace('{lastName}', `${inputs.lastName}`)
    .replace('{userType}', `${inputs.userType}`)
    .replace('{userType}', `${inputs.userType}`);

  return newBody;
};
