import re
from pathlib import Path



ruta_directorio_codigo = Path(__file__).resolve().parent

ruta_a_leer = ruta_directorio_codigo / Path( "..")/ "content" / "originals"



for archivo in ruta_a_leer.iterdir():
  with open(archivo,"r",encoding="utf-8") as file :
    readed_file = file.read()
    regex = r"title:\s\"([^\"]*)\"\s.*?\simg:\s\"([^\"]*)\""
    result = re.search(regex,readed_file)
    
    if result: 
      title = result.group(1)
      title_for_replace = title.replace(" ","-")
      img_to_replace = result.group(2)
      
      result3 = readed_file.replace(img_to_replace,f"{title_for_replace}.webp")
      
      with open(archivo, "w",encoding="utf-8") as f2: 
        f2.write(result3)
        print(f"{archivo.name} modificado")