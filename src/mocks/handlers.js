import { rest } from 'msw'

export const handlers = [
  rest.get('/', (req, res, ctx) => {

    return res(
      ctx.status(200),
      ctx.json([
        {
          "id": 1,
          "nom": " projet 1",
          "description": "description 1",
          "commentaire": " ceci est un commentaire 1 de test",
          "etape": "En attente"
        },
        {
          "id": 2,
          "nom": " projet 2",
          "description": "description 2",
          "commentaire": " ceci est un commentaire 2 de test",
          "etape": "En cours"
        },
        {
          "id": 3,
          "nom": " projet 3",
          "description": "description 3",
          "commentaire": " ceci est un commentaire 3 de test",
          "etape": "Terminé"
        },
        {
          "id": 5,
          "nom": " projet 5",
          "description": "description 5",
          "commentaire": " ceci est un commentaire 5 de test",
          "etape": "En cours"
        },
        {
          "id": 7,
          "nom": " projet 7",
          "description": "description 7",
          "commentaire": " ceci est un commentaire 7 de test",
          "etape": "En attente"
        }]),
    )
  }),
]