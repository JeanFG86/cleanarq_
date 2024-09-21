import { AccountRepositoryDatabase } from "./AccountRepository";
import { MailerGatewayMemory } from "./MailerGateway";
import GetAccount from "./GetAccount";
import Signup from "./Signup";
import { Registry } from "./DI";
import { PgPromiseAdapter } from "./DatabaseConnection";
import { ExpressAdapter } from "./HttpServer";

const httpServer = new ExpressAdapter();
Registry.getInstance().provide("databaseConnection", new PgPromiseAdapter());
Registry.getInstance().provide("accountRepository", new AccountRepositoryDatabase());
Registry.getInstance().provide("mailerGateway", new MailerGatewayMemory());

httpServer.register("post", "/signup", async function (params: any, body: any) {
  const input = body;
  const signup = new Signup();
  const output = await signup.execute(input);
  return output;
});

httpServer.register("get", "/accounts/:accountId", async function (params: any, body: any) {
  const getAccount = new GetAccount();
  const output = await getAccount.execute(params.accountId);
  return output;
});

httpServer.listen(3000);
