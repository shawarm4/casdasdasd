# 02010-XPath.py
# # -*- coding: utf-8 -*-

import xml.etree.ElementTree as ET

def obtenerCoordenadas(archivoXML, xPathDistancias, xPathAltitudes, xPathEtiquetas):
    """Saca de un archivo XML de rutas las distancias entre los hitos, sus altitudes y sus nombres"""
    ns = {'ns': 'http://www.uniovi.es'}
    
    try:      
        arbol = ET.parse(archivoXML)
        
    except IOError:
        print ('No se encuentra el archivo ', archivoXML)
        exit()
        
    except ET.ParseError:
        print("Error procesando en el archivo XML = ", archivoXML)
        exit()
       
    raiz = arbol.getroot()

    distancias = [20]
    for hijo in raiz.findall(xPathDistancias, namespaces=ns): 
        distancias.append(hijo.text)
    
    altitudes = []
    for hijo in raiz.findall(xPathAltitudes, namespaces=ns):  
        altitud = hijo.get('altitud')
        altitudes.append(altitud)

    etiquetas = []
    for hijo in raiz.findall(xPathEtiquetas, namespaces=ns): 
        for lugarInicio in hijo.findall(".//ns:lugarInicio", namespaces=ns):
            etiquetas.append(lugarInicio.text)
        for nombreHito in hijo.findall(".//ns:nombreHito", namespaces=ns):
            etiquetas.append(nombreHito.text)

    return [float(i) for i in distancias], [int(i) for i in altitudes], etiquetas

def create_topographic_profile(distances, altitudes, labels, x_scale, y_scale, output_file):
    """Crea el SVG a partir de los tres grupos de valores distancias, altitudes y etiquetas"""
    labels_margin = 10

    width = sum(map(lambda x: x*x_scale,distances))
    height = 180
    margin = 300

    svg_content = f'<?xml version="1.0" encoding="UTF-8"?>\n<svg width="{width + margin}" height="{height + margin}" xmlns="http://www.w3.org/2000/svg">\n'

    prevDist = 0.0
    polyline_points = []
    polyline_points.append(f"{distances[0] * x_scale},{height}")
    for d, a, l in zip(distances, altitudes, labels):
        x = d * x_scale
        x += prevDist
        y = a * y_scale

        polyline_points.append(f"{x},{height - y}")
        svg_content += f'<text x="{x}" y="{height + labels_margin}" style="writing-mode: tb; glyph-orientation-vertical: 0;">{l}</text>\n'
        prevDist = x

    polyline_points.append(f"{width},{height}")
    polyline_points.append(f"{distances[0] * x_scale},{height}")

    svg_content += f'<polyline points="{" ".join(polyline_points)}" fill="none" stroke="red" stroke-width="2"/>\n'

    svg_content += '</svg>'

    with open(output_file, 'w') as file:
        file.write(svg_content)

def main():
    """Prueba de la función verXPath()"""
    miArchivoXML = "rutasEsquema.xml"

    xPathDistancias1 = ".//ns:ruta[1]//ns:distanciaHitoAnterior"
    xPathAltutides1 = ".//ns:ruta[1]//ns:coordenadasInicio"
    xPathEtiquetas1 = ".//ns:ruta[1]"

    xPathDistancias2 = ".//ns:ruta[2]//ns:distanciaHitoAnterior"
    xPathAltutides2 = ".//ns:ruta[2]//ns:coordenadasInicio"
    xPathEtiquetas2 = ".//ns:ruta[2]"

    xPathDistancias3 = ".//ns:ruta[3]//ns:distanciaHitoAnterior"
    xPathAltutides3 = ".//ns:ruta[3]//ns:coordenadasInicio"
    xPathEtiquetas3 = ".//ns:ruta[3]"

    distancias1, longitudes1, etiquetas1 = obtenerCoordenadas(miArchivoXML, xPathDistancias1, xPathAltutides1, xPathEtiquetas1)
    distancias2, longitudes2, etiquetas2 = obtenerCoordenadas(miArchivoXML, xPathDistancias2, xPathAltutides2, xPathEtiquetas2)
    distancias3, longitudes3, etiquetas3 = obtenerCoordenadas(miArchivoXML, xPathDistancias3, xPathAltutides3, xPathEtiquetas3)

    print(distancias1)
    print(longitudes1)
    print(etiquetas1)

    create_topographic_profile(distancias1, longitudes1, etiquetas1, 3, 0.1, "perfil1.svg")
    create_topographic_profile(distancias2, longitudes2, etiquetas2, 1, 0.1, "perfil2.svg")
    create_topographic_profile(distancias3, longitudes3, etiquetas3, 0.45, 0.15, "perfil3.svg")

if __name__ == "__main__":
    main()    
