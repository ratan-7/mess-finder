exports.hasAccess = (user, mess) => {
  if (mess.isFreeSample) return true;
  if (!user) return false;

  const now = new Date();
  return (user.subscriptions || []).some((s) => {
    if (s.expiresAt && s.expiresAt <= now) return false;
    if (s.type === "full") return true;
    if (s.type === "category") return s.category === mess.category;
    return false;
  });
};
