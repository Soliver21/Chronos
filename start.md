docker inditás
docker compose up -d --build                                                       --- futtatni terminalban (gyökér könyvtár)
docker compose down                                                                --- docker leállitás
docker exec -it chronos_backend npx prisma studio --browser none --port 5555       --- prisma studio
docker-compose logs -f backend vagy frotned                                        --- logokat iratja ki
docker-compose restart backend vagy frontend                                       --- ujrainditja az adott kontainert
docker exec chronos_backend npm run prisma:seed                                    --- seed
