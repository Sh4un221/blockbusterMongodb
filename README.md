# Consultas Blockbuster

1. **Contar el número total de copias de DVD disponibles en todos los registros:**

   ```javascript
   [
     {
       $unwind: "$format"
     },
     {
       $match: { "format.name": "dvd" }
     },
     {
       $group: {
         _id: null,
         totalCopies: { $sum: "$format.copies" }
       }
     }
   ]
   ```

2. **Encontrar todos los actores que han ganado premios Oscar:**

   ```javascript
   [
     {
       $match: {
         $expr: {
           $gt: [{ $size: "$awards" }, 0]
         },
         "awards.name": "Oscar Award"
       }
     },
     {
       $project: {
         _id:0,
   			full_name:1
         
       }
     }
   ]
   
   ```

3. **Encontrar la cantidad total de premios que ha ganado cada actor:**

   ```javascript
   [
     {
       $match: {
         $expr: {
           $gt: [{ $size: "$awards" }, 0]
         }
       }
     },
     {
       $project: {
         _id: 0,
         full_name: 1,
         size: {$size: "$awards"}
       }
     }
   ]
   ```

4. **Obtener todos los actores nacidos después de 1980:**

   ```javascript
   [
     {
       $match: {
         $expr: {
           $gt: ["$date_of_birth", "1980"]
         }
       }
     },
     {
       $project: {
         _id: 0,
         full_name: 1,
         date_of_birth:1
       }
     }
   ]
   ```

5. **Encontrar el actor con más premios:**

   ```javascript
   [
     {
       $addFields: {
         numAwards: { $size: "$awards" }
       }
     },
     {
       $sort: { numAwards: -1 }
     },
     {
       $limit: 1
     },
     {
       $project: {
         _id: 0,
         full_name: 1,
         numAwards: 1
       }
     }
   ]
   ```

6. **Listar todos los géneros de películas distintos:**

   ```javascript
   [
     {
       $unwind: "$genre"
     },
     {
       $group: {
         _id: null,
         genres: { $addToSet: "$genre" }
       }
     },
     {
       $project: {
         _id: 0,
         genres: 1
       }
     }
   ]
   ```

7. **Encontrar películas donde el actor con id 1 haya participado:**

   ```javascript
   match
   ```

8. **Calcular el valor total de todas las copias de DVD disponibles:**

   ```javascript
   [
     {
       $unwind: "$format"
     },
     {
       $match: { "format.name": "dvd" }
     },
     {
       $group: {
         _id: null,
         totalValue: { $sum: { $multiply: ["$format.copies", "$format.value"] } }
       }
     },
     {
       $project: {
         _id: 0,
         totalValue: 1
       }
     }
   ]
   ```

9. **Encontrar todas las películas en las que John Doe ha actuado:**

   ```javascript
   [
     {
       $match: {
         "character.id_actor": 1
       }
     },
     {
       $project: {
         _id: 0,
         name: 1
       }
     }
   ]
   ```

10. **Encontrar el número total de actores en la base de datos:**

    ```javascript
    [
      {
        $count: "totalActores"
      }
    ]
    ```

11. **Encontrar la edad promedio de los actores en la base de datos:**

    ```javascript
    [
      {
        $addFields: {
          age: {
            $subtract: [
              { $year: new Date() },
              { $toInt: { $substr: ["$date_of_birth", 0, 4] } }
            ]
          }
        }
      },
      {
        $group: {
          _id: null,
          averageAge: { $avg: "$age" }
        }
      },
      {
        $project: {
          _id: 0,
          averageAge: 1
        }
      }
    ]
    ```

12. **Encontrar todos los actores que tienen una cuenta de Instagram:**

    ```javascript
    [
      {
        $match: {
          "social_media.instagram": { $exists: true, $ne: "" }
        }
      },
      {
        $project: {
          _id: 0,
          full_name: 1,
          instagram: "$social_media.instagram"
        }
      }
    ]
    ```

13. **Encontrar todas las películas en las que participan actores principales:**

    ```javascript
    [
      {
        $match: {
          "character.rol": "principal"
        }
      },
      {
        $project: {
          _id: 0,
          name: 1,
          "character.apodo": 1
        }
      }
    ]
    ```

14. **Encontrar el número total de premios que se han otorgado en todas las películas:**

    ```javascript
    [
      {
        $unwind: "$awards"
      },
      {
        $group: {
          _id: null,
          totalAwards: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          totalAwards: 1
        }
      }
    ]
    ```

15. **Encontrar todas las películas en las que John Doe ha actuado y que estén en formato Blu-ray:**

    ```javascript
    [
      {
        $match: {
          "character.id_actor": 1,
          "format.name": "Bluray"
        }
      },
      {
        $project: {
          _id: 0,
          name: 1,
          "format": {
            $filter: {
              input: "$format",
              as: "f",
              cond: { $eq: ["$$f.name", "Bluray"] }
            }
          }
        }
      }
    ]
    ```

16. **Encontrar todas las películas de ciencia ficción que tengan al actor con id 3:**

    ```javascript
    [
      {
        $match: {
          genre: "Ciencia Ficción",
          "character.id_actor": 3
        }
      },
      {
        $project: {
          _id: 0,
          name: 1
        }
      }
    ]
    ```

17. **Encontrar la película con más copias disponibles en formato DVD:**

    ```javascript
    [
      {
        $unwind: "$format"
      },
      {
        $match: { "format.name": "dvd" }
      },
      {
        $sort: { "format.copies": -1 }
      },
      {
        $limit: 1
      },
      {
        $project: {
          _id: 0,
          name: 1,
          copies: "$format.copies"
        }
      }
    ]
    ```

18. **Encontrar todos los actores que han ganado premios después de 2015:**

    ```javascript
    [
      {
        $match: {
          "awards.year": { $gt: 2015 }
        }
      },
      {
        $project: {
          _id: 0,
          full_name: 1,
          awards: {
            $filter: {
              input: "$awards",
              as: "award",
              cond: { $gt: ["$$award.year", 2015] }
            }
          }
        }
      }
    ]
    ```

19. **Calcular el valor total de todas las copias de Blu-ray disponibles:**

    ```javascript
    [
      {
        $unwind: "$format"
      },
      {
        $match: { "format.name": "Bluray" }
      },
      {
        $group: {
          _id: null,
          totalValue: { $sum: { $multiply: ["$format.copies", "$format.value"] } }
        }
      },
      {
        $project: {
          _id: 0,
          totalValue: 1
        }
      }
    ]
    ```

20. **Encontrar todas las películas en las que el actor con id 2 haya participado:**

    ```javascript
    [
      {
        $match: {
          "character.id_actor": 2
        }
      },
      {
        $project: {
          _id: 0,
          name: 1,
          character: {
            $filter: {
              input: "$character",
              as: "c",
              cond: { $eq: ["$$c.id_actor", 2] }
            }
          }
        }
      }
    ]
    ```

