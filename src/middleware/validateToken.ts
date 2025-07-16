import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Token not found." });
    return;
  }
  jwt.verify(token, process.env.SECRET as string, (err, user) => {
    if (err) {
      res.sendStatus(403);
      return;
    }
    req.user = user;
    next();
  });
};

export const authenticateAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  authenticateToken(req, res, () => {
    if (!(req.user as any).isAdmin) {
      res.status(403).json({ message: "Access denied." });
      return;
    }
    next();
  });
};
