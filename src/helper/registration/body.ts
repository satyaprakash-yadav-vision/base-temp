export const getBody = (data: { body: string; placeholders }) => {
  const inputs = data.placeholders;
  const body = data.body;

  const newBody = body
    .replaceAll('{firstName}', `${inputs.firstName}`)
    .replaceAll('{lastName}', `${inputs.lastName}`)
    .replaceAll('{email}', `${inputs.email}`)
    .replace('{password}', `${inputs.password}`);

  return newBody;
};
