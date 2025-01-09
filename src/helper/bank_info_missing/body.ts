export const getBody = (data: { body: string; placeholders }) => {
  const inputs = data.placeholders;
  const body = data.body;

  const newBody = body
    .replace('{firstName}', `${inputs.firstName}`)
    .replace('{lastName}', `${inputs.lastName}`)
    .replace('{email}', `${inputs.email}`)
    .replace('{phoneNo}', `${inputs.phoneNo}`);

  return newBody;
};
