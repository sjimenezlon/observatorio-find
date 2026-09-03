// =============================================================================
// Cerebro fintech LATAM · panel por país e hitos
//
// GENERADO POR SCRIPT desde los JSON de investigación (3 de septiembre de 2026).
// No editar a mano: corregir el JSON y regenerar. Cada entrada declara fuente,
// URL https y fecha; `null` significa «sin dato verificable», nunca cero.
// Lo verifica scripts/verificar-cerebro.ts en cada build.
// =============================================================================
import type { Hito, Pais } from "./tipos";

export const PAISES_CEREBRO: Pais[] = [
  {
    "code": "BR",
    "nombre": "Brasil",
    "flag": "🇧🇷",
    "fintechs": {
      "n": 2156,
      "anio": 2025,
      "fuente": "Fincatch · Mapeamento de Fintechs Atuantes no Brasil 2025 (27-nov-2025; 2024: 2.048)",
      "url": "https://www.fincatch.com.br/post/mapeamento-fintechs-2025-o-retrato-mais-atual-do-ecossistema-das-iniciativas-que-atuam-no-brasil"
    },
    "fintechs_bid": {
      "n": 722,
      "anio": 2023,
      "fuente": "BID/Finnovista · Fintech en América Latina y el Caribe (IV informe, 2024; datos 2023, cuadro 11)",
      "url": "https://colcapital.org/wp-content/uploads/2024/07/VC-Fintech_Latam_BID_Finnovista.pdf"
    },
    "segmentos": [],
    "segmentos_fuente": null,
    "ley_fintech": {
      "estado": "parcial",
      "norma": "Sin ley fintech única: Ley 12.865/2013 (arreglos de pago) + Ley 14.478/2022 (activos virtuales) + regulación BCB",
      "nombre": null,
      "anio": 2013,
      "detalle": "El BCB regula por resoluciones: instituciones de pago, Pix, Open Finance y, desde nov-2025, proveedores de activos virtuales.",
      "url": "https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2022/lei/l14478.htm"
    },
    "reguladores": [
      {
        "nombre": "Banco Central do Brasil",
        "sigla": "BCB",
        "url": "https://www.bcb.gov.br/"
      },
      {
        "nombre": "Comissão de Valores Mobiliários",
        "sigla": "CVM",
        "url": "https://www.gov.br/cvm/pt-br"
      }
    ],
    "sandbox": {
      "estado": "operando",
      "norma": null,
      "nombre": "Sandbox Regulatório do BCB",
      "anio": null,
      "detalle": "Ambiente controlado del BCB por ciclos (Res. BCB 29/2020); primer ciclo 2021-2022.",
      "url": "https://www.bcb.gov.br/estabilidadefinanceira/sandbox"
    },
    "open_finance": {
      "estado": "obligatorio",
      "norma": "Res. Conjunta CMN/BCB 1/2020 y sucesivas; Res. Conjunta 15 y Res. CMN 5.265/2025 (portabilidad de crédito)",
      "nombre": null,
      "anio": null,
      "detalle": "A 5 años (ago-2025) suma >100 M de autorizaciones, 65 M de cuentas conectadas y ~R$1,2 mil millones/mes en pagos; desde 2026 permite portabilidad de crédito.",
      "url": "https://www.bcb.gov.br/detalhenoticia/20800/nota"
    },
    "riel_inmediato": {
      "nombre": "Pix",
      "operador": "Banco Central do Brasil",
      "lanzamiento": "2020-11",
      "usuarios_m": 186.3,
      "llaves_m": 920,
      "tx_mes_m": 7238,
      "tx_dia_m": null,
      "fecha_dato": "2026-08",
      "detalle": "186,3 M de usuarios en el DICT (167,7 M PF + 18,6 M PJ) al 31-ago-2026; 7.238 M de transacciones en jul-2026 (R$3,2 billones); 2025 cerró con ~80.000 M de tx, R$35 billones y >920 M de llaves; récord de 313 M tx en un día (dic-2025).",
      "fuente": "BCB · Pix Dados Abertos (Olinda) + Relatório de Gestão do Pix 2023-2025",
      "url": "https://olinda.bcb.gov.br/olinda/servico/Pix_DadosAbertos/versao/v1/odata/PixUsuariosCadastradosDICT?%24top=3&%24orderby=DataGraficosPix%20desc&%24format=json"
    },
    "cripto": {
      "regimen": "regulado",
      "norma": "Ley 14.478/2022 + Resoluciones BCB 519, 520 y 521 (10-nov-2025) + Res. BCB 584 (ago-2026, antifraude)",
      "detalle": "Las PSAV requieren autorización del BCB; la Res. 584 (ago-2026) impone retención preventiva de hasta 24 h en transferencias >US$10.000 a exchanges del exterior o autocustodia.",
      "url": "https://www.bcb.gov.br/estabilidadefinanceira/exibenormativo?tipo=Resolu%C3%A7%C3%A3o%20BCB&numero=519"
    },
    "gremio": {
      "nombre": "ABFintechs",
      "miembros": null,
      "url": "https://www.abfintechs.com.br/"
    },
    "lideres": [
      {
        "nombre": "Nubank",
        "tipo": "neobanco",
        "usuarios_m": 118,
        "fecha": "2026-06",
        "url": "https://international.nubank.com.br/pt-br/companhia/nu-holdings-ltd-divulga-resultados-financeiros-do-segundo-trimestre-de-2026/"
      }
    ],
    "inclusion": {
      "cuenta_pct": 86.4,
      "pago_digital_pct": 77.4,
      "fuente": "Global Findex 2025 (datos 2024) · Banco Mundial API (source=28)",
      "url": "https://api.worldbank.org/v2/country/BRA/indicator/account.t.d?source=28&format=json&mrv=1"
    },
    "poblacion_adulta_m": 171.6,
    "notas": "Pix procesa >7.000 M de operaciones al mes y el BCB ya regula a los exchanges (Res. 519-521, vigentes desde feb-2026) mientras Drex abandonó la blockchain (nov-2025). El conteo de fintechs difiere por metodología: Fincatch 2.156 (2025), Distrito 1.706 (mar-2025) / 1.728 (jul-2026), BID 722 (2023)."
  },
  {
    "code": "MX",
    "nombre": "México",
    "flag": "🇲🇽",
    "fintechs": {
      "n": 795,
      "anio": 2026,
      "fuente": "Finnovista Fintech Radar México 2026 (24-feb-2026): 795 locales + 316 extranjeras",
      "url": "https://www.finnosummit.com/wp-content/uploads/2026/02/Finnovista_Fintech_Radar_Mexico_2026.pdf"
    },
    "fintechs_bid": {
      "n": 618,
      "anio": 2023,
      "fuente": "BID/Finnovista · Fintech en América Latina y el Caribe (IV informe, 2024; datos 2023, cuadro 11)",
      "url": "https://colcapital.org/wp-content/uploads/2024/07/VC-Fintech_Latam_BID_Finnovista.pdf"
    },
    "segmentos": [
      {
        "segmento": "Lending",
        "n": 170,
        "pct": 21.4
      },
      {
        "segmento": "Technological Infrastructure for Banks & Fintechs",
        "n": 125,
        "pct": 15.7
      },
      {
        "segmento": "Payments & Remittances",
        "n": 120,
        "pct": 15.1
      },
      {
        "segmento": "Enterprise Financial Management",
        "n": 113,
        "pct": 14.2
      },
      {
        "segmento": "Insurtech",
        "n": 55,
        "pct": 6.9
      },
      {
        "segmento": "Personal Financial Management",
        "n": 55,
        "pct": 6.9
      },
      {
        "segmento": "Proptech",
        "n": 55,
        "pct": 6.9
      },
      {
        "segmento": "Wealth Management",
        "n": 32,
        "pct": 4
      },
      {
        "segmento": "Digital Banking",
        "n": 27,
        "pct": 3.4
      },
      {
        "segmento": "Crypto",
        "n": 22,
        "pct": 2.8
      },
      {
        "segmento": "Crowdfunding",
        "n": 11,
        "pct": 1.4
      },
      {
        "segmento": "Open Finance",
        "n": 10,
        "pct": 1.3
      }
    ],
    "segmentos_fuente": {
      "fuente": "Finnovista Fintech Radar México 2026 (PDF, 'Panorama local')",
      "url": "https://www.finnosummit.com/wp-content/uploads/2026/02/Finnovista_Fintech_Radar_Mexico_2026.pdf",
      "anio": 2026
    },
    "ley_fintech": {
      "estado": "vigente",
      "norma": "Ley para Regular las Instituciones de Tecnología Financiera (DOF 9-mar-2018)",
      "nombre": null,
      "anio": 2018,
      "detalle": "Crea las ITF (fondos de pago electrónico y financiamiento colectivo), activos virtuales bajo Banxico y la figura de 'modelos novedosos'.",
      "url": "https://www.dof.gob.mx/nota_detalle.php?codigo=5515623&fecha=09/03/2018"
    },
    "reguladores": [
      {
        "nombre": "Comisión Nacional Bancaria y de Valores",
        "sigla": "CNBV",
        "url": "https://www.gob.mx/cnbv"
      },
      {
        "nombre": "Banco de México",
        "sigla": "Banxico",
        "url": "https://www.banxico.org.mx/"
      }
    ],
    "sandbox": {
      "estado": "operando",
      "norma": null,
      "nombre": "Modelos novedosos (art. 80 Ley Fintech)",
      "anio": null,
      "detalle": "Figura legal de autorización temporal; muy poco utilizada en la práctica.",
      "url": "https://www.dof.gob.mx/nota_detalle.php?codigo=5515623&fecha=09/03/2018"
    },
    "open_finance": {
      "estado": "en tramite",
      "norma": "Art. 76 Ley Fintech (APIs de datos abiertos)",
      "nombre": null,
      "anio": null,
      "detalle": "Solo hay reglas secundarias para datos abiertos (cajeros, 2020); sin normas para datos agregados y transaccionales; el Observatorio registra un amparo en dic-2025 (no verificado con URL en esta ronda).",
      "url": null
    },
    "riel_inmediato": {
      "nombre": "SPEI (+ CoDi y DiMo)",
      "operador": "Banco de México",
      "lanzamiento": "2004-08",
      "usuarios_m": 12.2,
      "llaves_m": null,
      "tx_mes_m": null,
      "tx_dia_m": null,
      "fecha_dato": "2026-04",
      "detalle": "SPEI procesó >7.300 M de operaciones en 2025 (DPL News/Mundi; Mobiletime reporta >6.000 M: discrepancia); DiMo alcanzó 12,2 M de usuarios (abr-2026); Circular 9/2026 de Banxico homologa la experiencia de transferencias móviles con plazo 14-dic-2026.",
      "fuente": "DPL News (SPEI 22 años) · Contexto Sinaloa (DiMo) · FintechExpert (Circular 9/2026)",
      "url": "https://dplnews.com/spei-cumple-22-anos-desafio-siguiente-fase/"
    },
    "cripto": {
      "regimen": "parcial",
      "norma": "Ley Fintech (activos virtuales, art. 30) + Circular 4/2019 de Banxico",
      "detalle": "Banxico limita el uso de activos virtuales por ITF y bancos a operaciones internas; no hay licencia de exchange para el público.",
      "url": "https://www.dof.gob.mx/nota_detalle.php?codigo=5515623&fecha=09/03/2018"
    },
    "gremio": {
      "nombre": "FinTech México",
      "miembros": null,
      "url": "https://www.fintechmexico.org/"
    },
    "lideres": [
      {
        "nombre": "Nu México",
        "tipo": "banco digital",
        "usuarios_m": 15,
        "fecha": "2026-07",
        "url": "https://www.merca20.com/nu-mexico-recibe-autorizacion-para-iniciar-operaciones-como-banco-que-significa-eso-para-sus-clientes/"
      }
    ],
    "inclusion": {
      "cuenta_pct": 53,
      "pago_digital_pct": 41.4,
      "fuente": "Global Findex 2025 (datos 2024) · Banco Mundial API (source=28)",
      "url": "https://api.worldbank.org/v2/country/MEX/indicator/account.t.d?source=28&format=json&mrv=1"
    },
    "poblacion_adulta_m": 100.2,
    "notas": "Segundo ecosistema de la región (795 locales + 316 extranjeras) en fase de consolidación: 77 % usa IA y 80 % colabora con bancos. En 2026 el hito es la migración de fintechs a licencia bancaria (Nu autorizado el 10-jul-2026) y la homologación de transferencias móviles de Banxico; el open finance sigue sin reglas secundarias."
  },
  {
    "code": "CO",
    "nombre": "Colombia",
    "flag": "🇨🇴",
    "fintechs": {
      "n": 410,
      "anio": 2025,
      "fuente": "Finnovista Fintech Radar Colombia 2025 (8-jul-2025): 410 locales; extranjeras = 37,3 % del ecosistema",
      "url": "https://www.finnosummit.com/wp-content/uploads/2025/07/RADAR-COLOMBIA-2025_ESPANOL_FINAL-2-1.pdf"
    },
    "fintechs_bid": {
      "n": 409,
      "anio": 2023,
      "fuente": "BID/Finnovista · Fintech en América Latina y el Caribe (IV informe, 2024; datos 2023, cuadro 11)",
      "url": "https://colcapital.org/wp-content/uploads/2024/07/VC-Fintech_Latam_BID_Finnovista.pdf"
    },
    "segmentos": [
      {
        "segmento": "Lending",
        "n": 115,
        "pct": 28
      },
      {
        "segmento": "Payments and Remittances",
        "n": 66,
        "pct": 16.1
      },
      {
        "segmento": "Enterprise Financial Management",
        "n": 53,
        "pct": 12.9
      },
      {
        "segmento": "Technological Infrastructure for Banks & Fintechs",
        "n": 33,
        "pct": 8
      },
      {
        "segmento": "Personal Financial Management",
        "n": 29,
        "pct": 7.1
      },
      {
        "segmento": "Proptech",
        "n": 27,
        "pct": 6.6
      },
      {
        "segmento": "Insurtech",
        "n": 19,
        "pct": 4.6
      },
      {
        "segmento": "Wealth Management",
        "n": 17,
        "pct": 4.1
      },
      {
        "segmento": "Digital Banking",
        "n": 16,
        "pct": 3.9
      },
      {
        "segmento": "Open Finance",
        "n": 15,
        "pct": 3.7
      },
      {
        "segmento": "Crypto",
        "n": 10,
        "pct": 2.4
      },
      {
        "segmento": "Crowdfunding",
        "n": 10,
        "pct": 2.4
      }
    ],
    "segmentos_fuente": {
      "fuente": "Finnovista Fintech Radar Colombia 2025 (PDF)",
      "url": "https://www.finnosummit.com/wp-content/uploads/2025/07/RADAR-COLOMBIA-2025_ESPANOL_FINAL-2-1.pdf",
      "anio": 2025
    },
    "ley_fintech": {
      "estado": "parcial",
      "norma": "Sin ley fintech única: Ley 1735/2014 (SEDPE), Decreto 1357/2018 (crowdfunding), Decreto 1297/2022 y Decreto 0368/2026 (finanzas abiertas), Ley 2294/2023 (pagos inmediatos)",
      "nombre": null,
      "anio": 2014,
      "detalle": "Regulación por decretos de la URF/Minhacienda y circulares de la SFC; el proyecto de ley cripto (PL 510/2025) fue archivado en jun-2026.",
      "url": "https://www.superfinanciera.gov.co/publicaciones/10116081/finanzas-abiertas-obligatorias-impulsaran-el-desarrollo-del-sistema-y-la-inclusion-financiera-en-el-pais/"
    },
    "reguladores": [
      {
        "nombre": "Superintendencia Financiera de Colombia",
        "sigla": "SFC",
        "url": "https://www.superfinanciera.gov.co/"
      },
      {
        "nombre": "Banco de la República",
        "sigla": "Banrep",
        "url": "https://www.banrep.gov.co/"
      }
    ],
    "sandbox": {
      "estado": "operando",
      "norma": null,
      "nombre": "La Arenera (espacio controlado de prueba, innovaSFC)",
      "anio": null,
      "detalle": "Sandbox de la SFC creado en 2018 y formalizado por el Decreto 1234/2020.",
      "url": "https://www.superfinanciera.gov.co/documentos/10099575/laarenera/"
    },
    "open_finance": {
      "estado": "obligatorio",
      "norma": "Decreto 0368 del 7-abr-2026 (modifica el Decreto 2555/2010)",
      "nombre": null,
      "anio": null,
      "detalle": "Pasa del esquema voluntario (Decreto 1297/2022) a finanzas abiertas obligatorias para las entidades vigiladas por la SFC.",
      "url": "https://www.superfinanciera.gov.co/publicaciones/10116081/finanzas-abiertas-obligatorias-impulsaran-el-desarrollo-del-sistema-y-la-inclusion-financiera-en-el-pais/"
    },
    "riel_inmediato": {
      "nombre": "Bre-B",
      "operador": "Banco de la República",
      "lanzamiento": "2025-10",
      "usuarios_m": 35,
      "llaves_m": 108,
      "tx_mes_m": null,
      "tx_dia_m": 5,
      "fecha_dato": "2026-06",
      "detalle": "Más de 108 M de llaves al 24-jun-2026, ~35 M de usuarios y >1.000 M de transacciones acumuladas en 8 meses (~5 M/día corrientes; el pico de 5,2 M no es promedio); a 6 meses (abr-2026) Banrep reportó 34 M de usuarios, 670 M de tx y COP 105 billones.",
      "fuente": "La República / Banco de la República (30-jun-2026)",
      "url": "https://www.larepublica.co/especiales/revolucion-de-los-pagos-que-conecta-al-pais/el-despliegue-de-bre-b-desde-su-lanzamiento-ya-tiene-108-millones-de-llaves-registradas-4425135"
    },
    "cripto": {
      "regimen": "sin marco",
      "norma": "PL 510/2025 Cámara (PSAV) archivado en jun-2026 (art. 190 Ley 5/1992)",
      "detalle": "Cuarto intento fallido de ley cripto; la DIAN exigirá reporte de tenencias y transacciones con criptoactivos desde el año gravable 2026.",
      "url": "https://www.camara.gov.co/servicios-activos-virtuales-497/"
    },
    "gremio": {
      "nombre": "Colombia Fintech",
      "miembros": null,
      "url": "https://colombiafintech.co/"
    },
    "lideres": [
      {
        "nombre": "Nequi",
        "tipo": "neobanco (compañía de financiamiento desde 1-sep-2026)",
        "usuarios_m": 29,
        "fecha": "2026-08",
        "url": "https://www.elcolombiano.com/negocios/nequi-neobanco-cambio-1-septiembre-2026-bancolombia-MG40466219"
      }
    ],
    "inclusion": {
      "cuenta_pct": 57.1,
      "pago_digital_pct": 49.2,
      "fuente": "Global Findex 2025 (datos 2024) · Banco Mundial API (source=28)",
      "url": "https://api.worldbank.org/v2/country/COL/indicator/account.t.d?source=28&format=json&mrv=1"
    },
    "poblacion_adulta_m": 42.7,
    "notas": "Bre-B (oct-2025) superó los 108 M de llaves y los 1.000 M de operaciones en menos de un año, y las finanzas abiertas pasaron a ser obligatorias (Decreto 0368/2026). El vacío sigue en cripto: el PL 510/2025 fue archivado el 20-jun-2026 y el sector opera sin marco integral."
  },
  {
    "code": "AR",
    "nombre": "Argentina",
    "flag": "🇦🇷",
    "fintechs": {
      "n": 383,
      "anio": 2024,
      "fuente": "Finnovista Fintech Radar Argentina 2024 (6-nov-2024): 383 locales (+11,7 %) y 484 con extranjeras",
      "url": "https://www.finnosummit.com/en/radar/finnovista-fintech-radar-argentina-2024/"
    },
    "fintechs_bid": {
      "n": 312,
      "anio": 2023,
      "fuente": "BID/Finnovista · Fintech en América Latina y el Caribe (IV informe, 2024; datos 2023, cuadro 11)",
      "url": "https://colcapital.org/wp-content/uploads/2024/07/VC-Fintech_Latam_BID_Finnovista.pdf"
    },
    "segmentos": [],
    "segmentos_fuente": null,
    "ley_fintech": {
      "estado": "parcial",
      "norma": "Sin ley fintech: Com. BCRA 'A' 6859 (PSP), Ley 27.739/2024 (PSAV), Decreto 353/2025 (finanzas abiertas), RG CNV 1150/2026 (tokenización)",
      "nombre": null,
      "anio": 2020,
      "detalle": "Regulación por comunicaciones del BCRA y resoluciones de la CNV; el Ejecutivo impulsa un Sistema de Finanzas Abiertas por decreto.",
      "url": "https://www.boletinoficial.gob.ar/detalleAviso/primera/325041/20250523"
    },
    "reguladores": [
      {
        "nombre": "Banco Central de la República Argentina",
        "sigla": "BCRA",
        "url": "https://www.bcra.gob.ar/"
      },
      {
        "nombre": "Comisión Nacional de Valores",
        "sigla": "CNV",
        "url": "https://www.cnv.gov.ar/"
      }
    ],
    "sandbox": {
      "estado": "operando",
      "norma": null,
      "nombre": "Sandbox regulatorio de tokenización (CNV)",
      "anio": null,
      "detalle": "Régimen de innovación para valores negociables tokenizados; la RG 1150/2026 lo prorroga hasta el 31-dic-2027 y amplía los instrumentos admitidos.",
      "url": "https://www.boletinoficial.gov.ar/detalleAviso/primera/343010/20260611"
    },
    "open_finance": {
      "estado": "voluntario",
      "norma": "Decreto 353/2025 (23-may-2025) crea el Sistema de Finanzas Abiertas",
      "nombre": null,
      "anio": null,
      "detalle": "Marco de adhesión con estándares a definir por BCRA y CNV; sin obligación general de compartir datos.",
      "url": "https://www.boletinoficial.gob.ar/detalleAviso/primera/325041/20250523"
    },
    "riel_inmediato": {
      "nombre": "Transferencias inmediatas / Transferencias 3.0 (QR interoperable)",
      "operador": "BCRA (cámaras Coelsa y otras)",
      "lanzamiento": "2020-12",
      "usuarios_m": null,
      "llaves_m": null,
      "tx_mes_m": 731.5,
      "tx_dia_m": null,
      "fecha_dato": "2026-03",
      "detalle": "731,5 M de transferencias inmediatas en pesos en mar-2026 (+25,6 % i.a.) por $82,2 billones; 99,6 M de pagos con QR interoperable (+66,9 %); 69,6 M de cuentas de pago (CVU).",
      "fuente": "BCRA · Informe de Pagos Minoristas marzo 2026 (30-abr-2026)",
      "url": "https://www.bcra.gob.ar/publicaciones/informe-de-pagos-minoristas-marzo-de-2026/"
    },
    "cripto": {
      "regimen": "regulado",
      "norma": "Ley 27.739 (mar-2024) crea el Registro de PSAV en la CNV; RG CNV 1150/2026 (tokenización)",
      "detalle": "Los exchanges deben inscribirse y cumplir requisitos de la CNV; la CNV amplió en jun-2026 el régimen de tokenización de valores negociables.",
      "url": "https://www.argentina.gob.ar/normativa/nacional/ley-27739-397275/texto"
    },
    "gremio": {
      "nombre": "Cámara Argentina de Fintech",
      "miembros": null,
      "url": "https://camarafintech.org/"
    },
    "lideres": [],
    "inclusion": {
      "cuenta_pct": 81.7,
      "pago_digital_pct": 72.2,
      "fuente": "Global Findex 2025 (datos 2024) · Banco Mundial API (source=28)",
      "url": "https://api.worldbank.org/v2/country/ARG/indicator/account.t.d?source=28&format=json&mrv=1"
    },
    "poblacion_adulta_m": 36.2,
    "notas": "Argentina es el ecosistema de pagos QR/transferencias más intenso de la región en relación con su población (731 M de transferencias inmediatas al mes) y en 2026 completó el 'Big Bang regulatorio' de la CNV (RG 1150, tokenización con sandbox hasta 2027). El open finance nace por decreto (353/2025) pero en clave voluntaria."
  },
  {
    "code": "CL",
    "nombre": "Chile",
    "flag": "🇨🇱",
    "fintechs": {
      "n": 348,
      "anio": 2024,
      "fuente": "Finnovista Fintech Radar Chile VI (24-jul-2024): 485 startups locales y extranjeras, 137 extranjeras → 348 locales; +16 % anual",
      "url": "https://www.finnosummit.com/en/radar/fintech-radar-chile-sixth-edition/"
    },
    "fintechs_bid": {
      "n": 305,
      "anio": 2023,
      "fuente": "BID/Finnovista · Fintech en América Latina y el Caribe (IV informe, 2024; datos 2023, cuadro 11)",
      "url": "https://colcapital.org/wp-content/uploads/2024/07/VC-Fintech_Latam_BID_Finnovista.pdf"
    },
    "segmentos": [],
    "segmentos_fuente": null,
    "ley_fintech": {
      "estado": "vigente",
      "norma": "Ley 21.521 'Fintec' (ene-2023); NCG 502 (registro), NCG 514/569 (finanzas abiertas)",
      "nombre": null,
      "anio": 2023,
      "detalle": "Crea el Registro de Prestadores de Servicios Financieros en la CMF y el Sistema de Finanzas Abiertas; en jun-2026 la CMF canceló inscripciones por incumplimiento.",
      "url": "https://www.bcn.cl/leychile/navegar?idNorma=1187323"
    },
    "reguladores": [
      {
        "nombre": "Comisión para el Mercado Financiero",
        "sigla": "CMF",
        "url": "https://www.cmfchile.cl/"
      },
      {
        "nombre": "Banco Central de Chile",
        "sigla": "BCCh",
        "url": "https://www.bcentral.cl/"
      }
    ],
    "sandbox": {
      "estado": "no hay",
      "norma": null,
      "nombre": null,
      "anio": null,
      "detalle": "La Ley Fintec no contempla sandbox; el registro CMF es la vía de entrada (42 startups registradas a may-2026 según Ecosistema Startup).",
      "url": "https://ecosistemastartup.com/ley-fintech-chile-2026-42-startups-registradas-y-plazos-cmf/"
    },
    "open_finance": {
      "estado": "en tramite",
      "norma": "NCG 514 (jul-2024) modificada por NCG 569 (1-jun-2026)",
      "nombre": null,
      "anio": null,
      "detalle": "La CMF postergó la entrada en vigencia del Sistema de Finanzas Abiertas de jul-2026 a jul-2027 e incorporó el Anexo Técnico N°3 (APIs).",
      "url": "https://www.cmfchile.cl/normativa/ncg_569_2026.pdf"
    },
    "riel_inmediato": {
      "nombre": "TEF (transferencias electrónicas vía CCA); sin riel con alias",
      "operador": "Centro de Compensación Automatizado (bancos)",
      "lanzamiento": null,
      "usuarios_m": null,
      "llaves_m": null,
      "tx_mes_m": null,
      "tx_dia_m": null,
      "fecha_dato": null,
      "detalle": "Chile no tiene un sistema de pagos inmediatos con alias operado por el banco central; Shinkansen impulsa una Cámara de Pagos de Bajo Valor ('Pix chileno') desde 2026.",
      "fuente": "Chócale (5-ene-2026)",
      "url": "https://chocale.cl/2026/01/diana-palacios-de-shinkansen-y-la-camara-de-pagos-de-bajo-valor-nuestros-clientes-principales-no-seran-bancos-al-menos-en-un-inicio/"
    },
    "cripto": {
      "regimen": "regulado",
      "norma": "Ley 21.521 (criptoactivos como instrumentos financieros: custodia e intermediación registradas en la CMF)",
      "detalle": "Los prestadores de servicios sobre criptoactivos deben inscribirse y ser autorizados por la CMF bajo la Ley Fintec.",
      "url": "https://www.bcn.cl/leychile/navegar?idNorma=1187323"
    },
    "gremio": {
      "nombre": "FinteChile",
      "miembros": null,
      "url": "https://www.fintechile.org/"
    },
    "lideres": [],
    "inclusion": {
      "cuenta_pct": 85.1,
      "pago_digital_pct": null,
      "fuente": "Global Findex 2025 (datos 2024) · Banco Mundial API (source=28)",
      "url": "https://api.worldbank.org/v2/country/CHL/indicator/account.t.d?source=28&format=json&mrv=1"
    },
    "poblacion_adulta_m": 16.6,
    "notas": "Chile tiene la ley fintech más completa de la región (21.521), pero su pieza central —las finanzas abiertas— se aplazó a julio de 2027 (NCG 569) tras una pulseada entre fintechs y la CMF. Sigue sin un riel de pagos inmediatos con alias; las TEF bancarias vía CCA cubren el espacio."
  },
  {
    "code": "PE",
    "nombre": "Perú",
    "flag": "🇵🇪",
    "fintechs": {
      "n": 193,
      "anio": 2024,
      "fuente": "Finnovista Fintech Radar Perú 2024 (12-dic-2024): 193 locales (sin variación vs 2023) + 153 extranjeras (44,2 %)",
      "url": "https://www.finnosummit.com/en/radar/peru-emerges-as-a-land-of-opportunity-for-over-150-foreign-fintech-startups/"
    },
    "fintechs_bid": {
      "n": 163,
      "anio": 2023,
      "fuente": "BID/Finnovista · Fintech en América Latina y el Caribe (IV informe, 2024; datos 2023, cuadro 11)",
      "url": "https://colcapital.org/wp-content/uploads/2024/07/VC-Fintech_Latam_BID_Finnovista.pdf"
    },
    "segmentos": [
      {
        "segmento": "Préstamos",
        "n": 50,
        "pct": 25.9
      },
      {
        "segmento": "Pagos y remesas",
        "n": 32,
        "pct": 16.6
      },
      {
        "segmento": "Gestión de patrimonio",
        "n": 31,
        "pct": 16.1
      },
      {
        "segmento": "Asesoría financiera personal",
        "n": 18,
        "pct": 9.3
      },
      {
        "segmento": "Gestión de emprendimientos",
        "n": 18,
        "pct": 9.3
      },
      {
        "segmento": "Proptech",
        "n": 10,
        "pct": 5.2
      },
      {
        "segmento": "Insurtech",
        "n": 10,
        "pct": 5.2
      },
      {
        "segmento": "Criptomonedas",
        "n": 8,
        "pct": 4.1
      },
      {
        "segmento": "Proveedoras de tecnología para instituciones financieras",
        "n": 7,
        "pct": 3.6
      },
      {
        "segmento": "Financiamiento participativo",
        "n": 3,
        "pct": 1.6
      },
      {
        "segmento": "Banca digital",
        "n": 3,
        "pct": 1.6
      },
      {
        "segmento": "Finanzas abiertas",
        "n": 3,
        "pct": 1.6
      }
    ],
    "segmentos_fuente": {
      "fuente": "BCRP · Reporte del Sistema Nacional de Pagos mar-2025, recuadro 6 (Radar Fintech Perú 2024, Finnovista)",
      "url": "https://www.bcrp.gob.pe/docs/Publicaciones/reporte-del-sistema-nacional-de-pagos/2025/marzo/rspf-marzo-2025-recuadro-6.pdf",
      "anio": 2024
    },
    "ley_fintech": {
      "estado": "parcial",
      "norma": "Sin ley fintech: DU 013-2020 (crowdfunding), Ley 31.814/2023 (interoperabilidad), Circular 0022-2025-BCRP (Reglamento SNP), Res. SBS 01747-2026 (BaaS)",
      "nombre": null,
      "anio": 2020,
      "detalle": "BCRP y SBS regulan por reglamentos: interoperabilidad obligatoria de billeteras (2022-23), nuevo Reglamento del Sistema Nacional de Pagos vigente desde abr-2026 y reglamento de Banking as a Service (jul-2026).",
      "url": "https://revistaganamas.com.pe/bcrp-aprueba-nuevo-reglamento-del-sistema-nacional-de-pagos-con-su-vigencia-desde-abril-de-2026/"
    },
    "reguladores": [
      {
        "nombre": "Superintendencia de Banca, Seguros y AFP",
        "sigla": "SBS",
        "url": "https://www.sbs.gob.pe/"
      },
      {
        "nombre": "Banco Central de Reserva del Perú",
        "sigla": "BCRP",
        "url": "https://www.bcrp.gob.pe/"
      },
      {
        "nombre": "Superintendencia del Mercado de Valores",
        "sigla": "SMV",
        "url": "https://www.smv.gob.pe/"
      }
    ],
    "sandbox": {
      "estado": "no hay",
      "norma": null,
      "nombre": null,
      "anio": null,
      "detalle": "No se verificó un sandbox formal en esta ronda; la SBS canaliza innovación por su portal de innovación financiera.",
      "url": "https://www.sbs.gob.pe/innovacion-financiera"
    },
    "open_finance": {
      "estado": "en tramite",
      "norma": "Reglamento General del SNP (Circular 0022-2025-BCRP, vigente abr-2026) con estándares de interoperabilidad",
      "nombre": null,
      "anio": null,
      "detalle": "Sin norma de finanzas abiertas obligatoria; el BCRP avanza por fases de interoperabilidad y prensa reporta un arranque con cuatro bancos (jun-2026, no verificado).",
      "url": "https://revistaganamas.com.pe/bcrp-aprueba-nuevo-reglamento-del-sistema-nacional-de-pagos-con-su-vigencia-desde-abril-de-2026/"
    },
    "riel_inmediato": {
      "nombre": "Yape/Plin interoperables (Estrategia de Interoperabilidad BCRP); TAPP en construcción",
      "operador": "BCRP (estrategia) · BCP/Interbank-Scotiabank-BBVA (billeteras)",
      "lanzamiento": "2023-04",
      "usuarios_m": null,
      "llaves_m": null,
      "tx_mes_m": 200,
      "tx_dia_m": null,
      "fecha_dato": "2026-08",
      "detalle": "Más de 200 M de transacciones interoperables al mes (ago-2026); el BCRP iniciará el piloto de TAPP (plataforma pública tipo UPI) a fines de 2026.",
      "fuente": "Infobae Perú (13-ago-2026) · BCRP Estrategia de Interoperabilidad",
      "url": "https://www.infobae.com/peru/2026/08/13/peru-supera-los-200-millones-de-transacciones-interoperables-al-mes-pero-el-80-de-los-pagos-aun-son-en-efectivo/"
    },
    "cripto": {
      "regimen": "sin marco",
      "norma": null,
      "detalle": "Sin ley ni licencia para PSAV; solo obligaciones ALA/CFT ante la UIF (no verificado con URL en esta ronda).",
      "url": null
    },
    "gremio": {
      "nombre": "Asociación Fintech del Perú",
      "miembros": null,
      "url": "https://fintechperu.com/"
    },
    "lideres": [
      {
        "nombre": "Yape",
        "tipo": "billetera",
        "usuarios_m": 15.5,
        "fecha": "2025-09",
        "url": "https://www.businessempresarial.com.pe/yape-alcanzo-los-15-5-millones-de-usuarios-activos-mensuales-segun-credicorp/"
      }
    ],
    "inclusion": {
      "cuenta_pct": 59.3,
      "pago_digital_pct": 51.7,
      "fuente": "Global Findex 2025 (datos 2024) · Banco Mundial API (source=28)",
      "url": "https://api.worldbank.org/v2/country/PER/indicator/account.t.d?source=28&format=json&mrv=1"
    },
    "poblacion_adulta_m": 26.4,
    "notas": "Perú es el caso de interoperabilidad forzada por el banco central: Yape y Plin superan 200 M de operaciones al mes y el BCRP prepara TAPP (piloto a fines de 2026) con apoyo del modelo UPI. En 2026 la SBS habilitó Banking as a Service (Res. 01747-2026) y rige el nuevo Reglamento del SNP; sigue sin marco cripto."
  },
  {
    "code": "UY",
    "nombre": "Uruguay",
    "flag": "🇺🇾",
    "fintechs": {
      "n": 52,
      "anio": 2023,
      "fuente": "BID/Finnovista · Fintech en América Latina y el Caribe (IV informe, 2024; datos 2023, cuadro 11)",
      "url": "https://colcapital.org/wp-content/uploads/2024/07/VC-Fintech_Latam_BID_Finnovista.pdf"
    },
    "fintechs_bid": {
      "n": 52,
      "anio": 2023,
      "fuente": "BID/Finnovista · Fintech en América Latina y el Caribe (IV informe, 2024; datos 2023, cuadro 11)",
      "url": "https://colcapital.org/wp-content/uploads/2024/07/VC-Fintech_Latam_BID_Finnovista.pdf"
    },
    "segmentos": [],
    "segmentos_fuente": null,
    "ley_fintech": {
      "estado": "parcial",
      "norma": "Ley 20.345 (sep-2024, activos virtuales) + normativa BCU (Circular 2507/2026); anteproyecto de ley de sandbox (2026)",
      "nombre": null,
      "anio": 2024,
      "detalle": "No hay ley fintech general; el BCU regula por circulares y presentó en 2026 un plan de modernización de pagos (ISO 20022, pagos rápidos, open finance).",
      "url": "https://www.impo.com.uy/bases/leyes/20345-2024"
    },
    "reguladores": [
      {
        "nombre": "Banco Central del Uruguay (Superintendencia de Servicios Financieros)",
        "sigla": "BCU/SSF",
        "url": "https://www.bcu.gub.uy/"
      }
    ],
    "sandbox": {
      "estado": "no hay",
      "norma": null,
      "nombre": "Anteproyecto de ley de sandbox regulatorio (BCU)",
      "anio": null,
      "detalle": "El directorio del BCU aprobó en may-2026 un anteproyecto de ley de sandbox (Res. 145/2026 según prensa); aún no está operativo.",
      "url": null
    },
    "open_finance": {
      "estado": "en tramite",
      "norma": "Plan de modernización de pagos del BCU (mar-2026)",
      "nombre": null,
      "anio": null,
      "detalle": "El plan incluye un esquema de finanzas abiertas y transferencias inmediatas 24/7 interoperables; sin norma vigente.",
      "url": "https://openhubnews.com/ln-uruguay-pisa-el-acelerador-fintech-con-innovacion-desde-el-bcu/"
    },
    "riel_inmediato": {
      "nombre": "Sin riel de pagos inmediatos con alias (plan BCU de pagos rápidos)",
      "operador": "BCU (plan)",
      "lanzamiento": null,
      "usuarios_m": null,
      "llaves_m": null,
      "tx_mes_m": null,
      "tx_dia_m": null,
      "fecha_dato": null,
      "detalle": "El BCU impulsa un sistema de pagos rápidos bajo ISO 20022, interoperable entre bancos y fintechs; sin fecha verificada.",
      "fuente": "Open Hub News (30-mar-2026)",
      "url": "https://openhubnews.com/ln-uruguay-pisa-el-acelerador-fintech-con-innovacion-desde-el-bcu/"
    },
    "cripto": {
      "regimen": "regulado",
      "norma": "Ley 20.345/2024 + Circular BCU 2507 (16-jul-2026), vigente desde 1-sep-2026",
      "detalle": "Los PSAV deben pedir autorización y registro al BCU; las empresas ya operativas tienen ventana del 1-sep-2026 al 31-mar-2027.",
      "url": "https://www.bcu.gub.uy/Comunicaciones/Paginas/Detalle-Noticia.aspx?noticia=527&title=El-BCU-aprueba-normativa-para-proveedores-de-servicios-de-activos-virtuales"
    },
    "gremio": {
      "nombre": "Cámara Uruguaya de Fintech",
      "miembros": null,
      "url": "https://fintech.org.uy/"
    },
    "lideres": [
      {
        "nombre": "dLocal",
        "tipo": "pagos (unicornio)",
        "usuarios_m": null,
        "fecha": null,
        "url": "https://www.latamfintech.co/countries/uruguay"
      },
      {
        "nombre": "Prex",
        "tipo": "billetera",
        "usuarios_m": 2,
        "fecha": null,
        "url": "https://www.latamfintech.co/countries/uruguay"
      }
    ],
    "inclusion": {
      "cuenta_pct": 73.7,
      "pago_digital_pct": null,
      "fuente": "Global Findex 2025 (datos 2024) · Banco Mundial API (source=28)",
      "url": "https://api.worldbank.org/v2/country/URY/indicator/account.t.d?source=28&format=json&mrv=1"
    },
    "poblacion_adulta_m": 2.8,
    "notas": "Uruguay es un hub exportador de fintech (dLocal, Prometeo, Bamboo) más que un mercado masivo; su avance regulatorio de 2026 es el marco de PSAV (Circular 2507, vigente 1-sep-2026). Todavía no tiene pagos inmediatos con alias ni open finance, ambos en el plan del BCU."
  },
  {
    "code": "EC",
    "nombre": "Ecuador",
    "flag": "🇪🇨",
    "fintechs": {
      "n": 93,
      "anio": 2023,
      "fuente": "BID/Finnovista · Fintech en América Latina y el Caribe (IV informe, 2024; datos 2023, cuadro 11)",
      "url": "https://colcapital.org/wp-content/uploads/2024/07/VC-Fintech_Latam_BID_Finnovista.pdf"
    },
    "fintechs_bid": {
      "n": 93,
      "anio": 2023,
      "fuente": "BID/Finnovista · Fintech en América Latina y el Caribe (IV informe, 2024; datos 2023, cuadro 11)",
      "url": "https://colcapital.org/wp-content/uploads/2024/07/VC-Fintech_Latam_BID_Finnovista.pdf"
    },
    "segmentos": [],
    "segmentos_fuente": null,
    "ley_fintech": {
      "estado": "vigente",
      "norma": "Ley Orgánica para el Desarrollo, Regulación y Control de los Servicios Financieros Tecnológicos (Ley Fintech, dic-2022) + Res. JPRF-F-2025-0155 y JPRF-T-2025-0156",
      "nombre": null,
      "anio": 2022,
      "detalle": "Las fintech deben constituirse como sociedades anónimas (Res. 0155, may-2025) y existe un marco de sandbox (Res. 0156, jun-2025) sin solicitantes a mar-2026.",
      "url": "https://www.primicias.ec/uploads/files/2025/05/21/REsolucion-fintech.pdf"
    },
    "reguladores": [
      {
        "nombre": "Superintendencia de Bancos",
        "sigla": "SB",
        "url": "https://www.superbancos.gob.ec/bancos/"
      },
      {
        "nombre": "Superintendencia de Economía Popular y Solidaria",
        "sigla": "SEPS",
        "url": "https://www.seps.gob.ec/"
      },
      {
        "nombre": "Banco Central del Ecuador",
        "sigla": "BCE",
        "url": "https://www.bce.fin.ec/"
      }
    ],
    "sandbox": {
      "estado": "operando",
      "norma": null,
      "nombre": "Sandboxes regulatorios (Res. JPRF-T-2025-0156)",
      "anio": null,
      "detalle": "Marco vigente desde jun-2025; a mar-2026 no se había presentado ninguna solicitud y faltaban normas secundarias.",
      "url": "https://asobanca.org.ec/wp-content/uploads/2025/06/Resolucion-No.-JPRF-T-2025-0156-Sandboxes-regulatorios.pdf"
    },
    "open_finance": {
      "estado": "no hay",
      "norma": null,
      "nombre": null,
      "anio": null,
      "detalle": "Sin norma de finanzas abiertas verificada.",
      "url": null
    },
    "riel_inmediato": {
      "nombre": null,
      "operador": "Banco Central del Ecuador (SPI)",
      "lanzamiento": null,
      "usuarios_m": null,
      "llaves_m": null,
      "tx_mes_m": null,
      "tx_dia_m": null,
      "fecha_dato": null,
      "detalle": "No se verificó un riel de pagos inmediatos con alias; el BCE opera el Sistema de Pagos Interbancarios y autoriza participantes del Sistema Auxiliar de Pagos.",
      "fuente": "BCE · Sistema de Pagos",
      "url": "https://www.bce.fin.ec/sistema-de-pagos/"
    },
    "cripto": {
      "regimen": "sin marco",
      "norma": null,
      "detalle": "Sin marco específico verificado para PSAV en esta ronda.",
      "url": null
    },
    "gremio": {
      "nombre": "Fintech EC (Asociación Fintech Ecuador)",
      "miembros": null,
      "url": "https://fintech.ec/"
    },
    "lideres": [
      {
        "nombre": "Deuna (Banco Pichincha)",
        "tipo": "billetera",
        "usuarios_m": null,
        "fecha": null,
        "url": "https://www.latamfintech.co/countries/ecuador"
      },
      {
        "nombre": "Kushki",
        "tipo": "pagos (unicornio)",
        "usuarios_m": null,
        "fecha": null,
        "url": "https://www.latamfintech.co/countries/ecuador"
      }
    ],
    "inclusion": {
      "cuenta_pct": 64.5,
      "pago_digital_pct": 43.3,
      "fuente": "Global Findex 2025 (datos 2024) · Banco Mundial API (source=28)",
      "url": "https://api.worldbank.org/v2/country/ECU/indicator/account.t.d?source=28&format=json&mrv=1"
    },
    "poblacion_adulta_m": 13.9,
    "notas": "Ecuador tiene ley fintech desde 2022 y sandbox desde 2025, pero la brecha está en la implementación: cero solicitudes de sandbox y reglas secundarias pendientes (mar-2026). La economía dolarizada apoya pagos digitales (Deuna, Kushki) sin un riel público de pagos inmediatos con alias."
  },
  {
    "code": "GT",
    "nombre": "Guatemala",
    "flag": "🇬🇹",
    "fintechs": {
      "n": 34,
      "anio": 2023,
      "fuente": "BID/Finnovista · Fintech en América Latina y el Caribe (IV informe, 2024; datos 2023, cuadro 11)",
      "url": "https://colcapital.org/wp-content/uploads/2024/07/VC-Fintech_Latam_BID_Finnovista.pdf"
    },
    "fintechs_bid": {
      "n": 34,
      "anio": 2023,
      "fuente": "BID/Finnovista · Fintech en América Latina y el Caribe (IV informe, 2024; datos 2023, cuadro 11)",
      "url": "https://colcapital.org/wp-content/uploads/2024/07/VC-Fintech_Latam_BID_Finnovista.pdf"
    },
    "segmentos": [],
    "segmentos_fuente": null,
    "ley_fintech": {
      "estado": "no hay",
      "norma": "Sin ley fintech; Decreto 15-2026 (Ley Integral contra el Lavado de Dinero, aprobada 2-jun-2026)",
      "nombre": null,
      "anio": null,
      "detalle": "No existe ley fintech; en 2026 el Congreso aprobó una nueva ley antilavado para evitar la lista gris del GAFI, cuyo reglamento elabora la SIB.",
      "url": "https://www.prensalibre.com/economia/guatemala-entra-en-fase-de-reglamentacion-de-la-ley-antilavado-antes-de-evaluacion-internacional/"
    },
    "reguladores": [
      {
        "nombre": "Superintendencia de Bancos",
        "sigla": "SIB",
        "url": "https://www.sib.gob.gt/"
      },
      {
        "nombre": "Banco de Guatemala",
        "sigla": "Banguat",
        "url": "https://www.banguat.gob.gt/"
      }
    ],
    "sandbox": {
      "estado": "no hay",
      "norma": null,
      "nombre": null,
      "anio": null,
      "detalle": "Sin sandbox verificado.",
      "url": null
    },
    "open_finance": {
      "estado": "no hay",
      "norma": null,
      "nombre": null,
      "anio": null,
      "detalle": "Sin norma verificada.",
      "url": null
    },
    "riel_inmediato": {
      "nombre": null,
      "operador": null,
      "lanzamiento": null,
      "usuarios_m": null,
      "llaves_m": null,
      "tx_mes_m": null,
      "tx_dia_m": null,
      "fecha_dato": null,
      "detalle": "No se verificó un sistema de pagos inmediatos interoperable con alias.",
      "fuente": null,
      "url": null
    },
    "cripto": {
      "regimen": "sin marco",
      "norma": "Decreto 15-2026 (ALA/CFT)",
      "detalle": "No hay regulación específica de criptoactivos; no se verificó si la nueva ley antilavado alcanza a los PSAV.",
      "url": "https://www.prensalibre.com/economia/guatemala-entra-en-fase-de-reglamentacion-de-la-ley-antilavado-antes-de-evaluacion-internacional/"
    },
    "gremio": {
      "nombre": null,
      "miembros": null,
      "url": null
    },
    "lideres": [
      {
        "nombre": "Nexa",
        "tipo": "neobanco",
        "usuarios_m": null,
        "fecha": null,
        "url": "https://www.latamfintech.co/countries/guatemala"
      },
      {
        "nombre": "Paggo / PAQ Wallet",
        "tipo": "pagos",
        "usuarios_m": null,
        "fecha": null,
        "url": "https://www.latamfintech.co/countries/guatemala"
      }
    ],
    "inclusion": {
      "cuenta_pct": 38.3,
      "pago_digital_pct": 22.6,
      "fuente": "Global Findex 2025 (datos 2024) · Banco Mundial API (source=28)",
      "url": "https://api.worldbank.org/v2/country/GTM/indicator/account.t.d?source=28&format=json&mrv=1"
    },
    "poblacion_adulta_m": 12.9,
    "notas": "Es el mercado con menor inclusión financiera del panel (38 % de adultos con cuenta, 23 % con pagos digitales) y sin marco fintech, sandbox ni riel público. El foco regulatorio de 2026 fue la ley antilavado (Decreto 15-2026) ante la evaluación de GAFILAT de 2027."
  },
  {
    "code": "DO",
    "nombre": "República Dominicana",
    "flag": "🇩🇴",
    "fintechs": {
      "n": 65,
      "anio": 2023,
      "fuente": "BID/Finnovista · Fintech en América Latina y el Caribe (IV informe, 2024; datos 2023, cuadro 11)",
      "url": "https://colcapital.org/wp-content/uploads/2024/07/VC-Fintech_Latam_BID_Finnovista.pdf"
    },
    "fintechs_bid": {
      "n": 65,
      "anio": 2023,
      "fuente": "BID/Finnovista · Fintech en América Latina y el Caribe (IV informe, 2024; datos 2023, cuadro 11)",
      "url": "https://colcapital.org/wp-content/uploads/2024/07/VC-Fintech_Latam_BID_Finnovista.pdf"
    },
    "segmentos": [],
    "segmentos_fuente": null,
    "ley_fintech": {
      "estado": "no hay",
      "norma": "Sin ley fintech; regulación sectorial de la Junta Monetaria (sistemas de pago, crowdfunding 2023)",
      "nombre": null,
      "anio": null,
      "detalle": "El BCRD regula pagos y entidades de intermediación; el próximo hito es el Sistema de Gestión de Pagos Instantáneos (SGPI) en 2027.",
      "url": "https://www.bancentral.gov.do/a/d/6142-sistema-de-gestion-de-pagos-instantaneos-sgpi"
    },
    "reguladores": [
      {
        "nombre": "Banco Central de la República Dominicana",
        "sigla": "BCRD",
        "url": "https://www.bancentral.gov.do/"
      },
      {
        "nombre": "Superintendencia de Bancos",
        "sigla": "SB",
        "url": "https://sb.gob.do/"
      }
    ],
    "sandbox": {
      "estado": "no hay",
      "norma": null,
      "nombre": null,
      "anio": null,
      "detalle": "Sin sandbox verificado en esta ronda.",
      "url": null
    },
    "open_finance": {
      "estado": "no hay",
      "norma": null,
      "nombre": null,
      "anio": null,
      "detalle": "Sin norma; hay iniciativas privadas de open banking (Finerio Connect con Visa y la ABA).",
      "url": "https://www.latamfintech.co/countries/republica-dominicana"
    },
    "riel_inmediato": {
      "nombre": "SGPI · Sistema de Gestión de Pagos Instantáneos (en construcción)",
      "operador": "Banco Central de la República Dominicana",
      "lanzamiento": "2027-H1",
      "usuarios_m": null,
      "llaves_m": null,
      "tx_mes_m": null,
      "tx_dia_m": null,
      "fecha_dato": "2026-08",
      "detalle": "El BCRD anunció que el SGPI entrará en producción en el primer semestre de 2027, con acreditación en ~10 segundos, 24/7 y conexión de proveedores de pago no bancarios.",
      "fuente": "BCRD · Diario Libre (23-ago-2026)",
      "url": "https://www.diariolibre.com/economia/finanzas/2026/08/23/nuevo-sistema-de-pagos-instantaneos-en-rd-arrancara-en-2027/3637010"
    },
    "cripto": {
      "regimen": "sin marco",
      "norma": null,
      "detalle": "Sin marco regulatorio de criptoactivos verificado.",
      "url": null
    },
    "gremio": {
      "nombre": "Adofintech",
      "miembros": null,
      "url": "https://www.adofintech.org/"
    },
    "lideres": [
      {
        "nombre": "Qik (Banco Popular)",
        "tipo": "neobanco",
        "usuarios_m": null,
        "fecha": null,
        "url": "https://www.latamfintech.co/countries/republica-dominicana"
      }
    ],
    "inclusion": {
      "cuenta_pct": 64.8,
      "pago_digital_pct": 52.5,
      "fuente": "Global Findex 2025 (datos 2024) · Banco Mundial API (source=28)",
      "url": "https://api.worldbank.org/v2/country/DOM/indicator/account.t.d?source=28&format=json&mrv=1"
    },
    "poblacion_adulta_m": 8.5,
    "notas": "Mercado emergente (65 fintechs en 2023) cuyo salto regulatorio es de infraestructura: el BCRD construye el SGPI, un riel de pagos instantáneos 24/7 abierto a no bancos, con arranque previsto para el primer semestre de 2027."
  },
  {
    "code": "PA",
    "nombre": "Panamá",
    "flag": "🇵🇦",
    "fintechs": {
      "n": 33,
      "anio": 2023,
      "fuente": "BID/Finnovista · Fintech en América Latina y el Caribe (IV informe, 2024; datos 2023, cuadro 11)",
      "url": "https://colcapital.org/wp-content/uploads/2024/07/VC-Fintech_Latam_BID_Finnovista.pdf"
    },
    "fintechs_bid": {
      "n": 33,
      "anio": 2023,
      "fuente": "BID/Finnovista · Fintech en América Latina y el Caribe (IV informe, 2024; datos 2023, cuadro 11)",
      "url": "https://colcapital.org/wp-content/uploads/2024/07/VC-Fintech_Latam_BID_Finnovista.pdf"
    },
    "segmentos": [],
    "segmentos_fuente": null,
    "ley_fintech": {
      "estado": "no hay",
      "norma": "Sin ley fintech (borradores desde 2019; proyecto cripto vetado en 2022)",
      "nombre": null,
      "anio": null,
      "detalle": "La SBP supervisa bancos y fideicomisos; en 2026 participó en el taller GAFILAT sobre fintech y ALA/CFT.",
      "url": "https://www.superbancos.gob.pa/node/1731"
    },
    "reguladores": [
      {
        "nombre": "Superintendencia de Bancos de Panamá",
        "sigla": "SBP",
        "url": "https://www.superbancos.gob.pa/"
      },
      {
        "nombre": "Superintendencia del Mercado de Valores",
        "sigla": "SMV",
        "url": "https://www.supervalores.gob.pa/"
      }
    ],
    "sandbox": {
      "estado": "no hay",
      "norma": null,
      "nombre": null,
      "anio": null,
      "detalle": "Sin sandbox verificado (la SBP anunció un Hub de Innovación Financiera en 2025, no verificado con URL).",
      "url": null
    },
    "open_finance": {
      "estado": "no hay",
      "norma": null,
      "nombre": null,
      "anio": null,
      "detalle": "Sin norma verificada.",
      "url": null
    },
    "riel_inmediato": {
      "nombre": null,
      "operador": null,
      "lanzamiento": null,
      "usuarios_m": null,
      "llaves_m": null,
      "tx_mes_m": null,
      "tx_dia_m": null,
      "fecha_dato": null,
      "detalle": "No se verificó un riel público de pagos inmediatos con alias.",
      "fuente": null,
      "url": null
    },
    "cripto": {
      "regimen": "sin marco",
      "norma": null,
      "detalle": "El proyecto de ley cripto de 2022 fue vetado y el debate se reabrió en 2025-2026 sin ley vigente (sin URL verificada).",
      "url": null
    },
    "gremio": {
      "nombre": "Cámara Fintech Panamá",
      "miembros": null,
      "url": "https://www.latamfintech.co/countries/panama"
    },
    "lideres": [
      {
        "nombre": "Appopay",
        "tipo": "superapp/billetera",
        "usuarios_m": null,
        "fecha": null,
        "url": "https://www.latamfintech.co/countries/panama"
      },
      {
        "nombre": "Lulubit",
        "tipo": "exchange cripto",
        "usuarios_m": null,
        "fecha": null,
        "url": "https://www.latamfintech.co/countries/panama"
      }
    ],
    "inclusion": {
      "cuenta_pct": 64.1,
      "pago_digital_pct": 52.1,
      "fuente": "Global Findex 2025 (datos 2024) · Banco Mundial API (source=28)",
      "url": "https://api.worldbank.org/v2/country/PAN/indicator/account.t.d?source=28&format=json&mrv=1"
    },
    "poblacion_adulta_m": 3.5,
    "notas": "Panamá combina un centro bancario internacional con un ecosistema fintech pequeño (33 en 2023) y sin ley, sandbox ni riel público. La agenda regulatoria de 2026 giró en torno a ALA/CFT y fintech (GAFILAT) más que a habilitación."
  },
  {
    "code": "CR",
    "nombre": "Costa Rica",
    "flag": "🇨🇷",
    "fintechs": {
      "n": 48,
      "anio": 2023,
      "fuente": "BID/Finnovista · Fintech en América Latina y el Caribe (IV informe, 2024; datos 2023, cuadro 11)",
      "url": "https://colcapital.org/wp-content/uploads/2024/07/VC-Fintech_Latam_BID_Finnovista.pdf"
    },
    "fintechs_bid": {
      "n": 48,
      "anio": 2023,
      "fuente": "BID/Finnovista · Fintech en América Latina y el Caribe (IV informe, 2024; datos 2023, cuadro 11)",
      "url": "https://colcapital.org/wp-content/uploads/2024/07/VC-Fintech_Latam_BID_Finnovista.pdf"
    },
    "segmentos": [],
    "segmentos_fuente": null,
    "ley_fintech": {
      "estado": "no hay",
      "norma": "Sin ley fintech (proyectos de ley cripto en discusión, 2026)",
      "nombre": null,
      "anio": null,
      "detalle": "Conassif/Sugef supervisan; el BCCR opera SINPE y SINPE Móvil como riel público.",
      "url": "https://www.bccr.fi.cr/cr/es/sistema-de-pagos/servicios-sinpe/servicios-dirigidos-a-personas/sinpe-movil.html"
    },
    "reguladores": [
      {
        "nombre": "Banco Central de Costa Rica",
        "sigla": "BCCR",
        "url": "https://www.bccr.fi.cr/"
      },
      {
        "nombre": "Consejo Nacional de Supervisión del Sistema Financiero",
        "sigla": "Conassif",
        "url": "https://www.conassif.fi.cr/"
      },
      {
        "nombre": "Superintendencia General de Entidades Financieras",
        "sigla": "Sugef",
        "url": "https://www.sugef.fi.cr/"
      }
    ],
    "sandbox": {
      "estado": "no hay",
      "norma": null,
      "nombre": null,
      "anio": null,
      "detalle": "Sin sandbox verificado en esta ronda.",
      "url": null
    },
    "open_finance": {
      "estado": "no hay",
      "norma": null,
      "nombre": null,
      "anio": null,
      "detalle": "Sin norma verificada.",
      "url": null
    },
    "riel_inmediato": {
      "nombre": "SINPE Móvil",
      "operador": "Banco Central de Costa Rica",
      "lanzamiento": "2015",
      "usuarios_m": null,
      "llaves_m": null,
      "tx_mes_m": null,
      "tx_dia_m": null,
      "fecha_dato": "2026-08",
      "detalle": "Transferencias inmediatas por número de celular operadas por el BCCR; en ago-2026 el BCCR anunció que prepara SINPE Móvil con QR y 'alias' para reducir el efectivo.",
      "fuente": "BCCR · El Observador CR (20-ago-2026)",
      "url": "https://observador.cr/banco-central-prepara-sinpe-movil-con-qr-y-alias-para-reducir-pagos-en-efectivo/"
    },
    "cripto": {
      "regimen": "sin marco",
      "norma": null,
      "detalle": "Sin ley; proyectos de ley para regular criptomonedas en discusión (jun-2026, sin URL verificada).",
      "url": null
    },
    "gremio": {
      "nombre": "Asociación Fintech de Costa Rica (ASOFINTECH)",
      "miembros": null,
      "url": "https://www.asofintechcr.com/"
    },
    "lideres": [
      {
        "nombre": "TiloPay",
        "tipo": "pagos",
        "usuarios_m": null,
        "fecha": null,
        "url": "https://www.latamfintech.co/countries/costa-rica"
      }
    ],
    "inclusion": {
      "cuenta_pct": 71.4,
      "pago_digital_pct": 60.5,
      "fuente": "Global Findex 2025 (datos 2024) · Banco Mundial API (source=28)",
      "url": "https://api.worldbank.org/v2/country/CRI/indicator/account.t.d?source=28&format=json&mrv=1"
    },
    "poblacion_adulta_m": 4.2,
    "notas": "Costa Rica tiene el riel público más antiguo de Centroamérica (SINPE Móvil, 2015) y alta inclusión (71 % con cuenta), pero no ley fintech ni marco cripto. El siguiente paso anunciado por el BCCR (ago-2026) es sumar QR y alias a SINPE Móvil."
  },
  {
    "code": "BO",
    "nombre": "Bolivia",
    "flag": "🇧🇴",
    "fintechs": {
      "n": 26,
      "anio": 2023,
      "fuente": "BID/Finnovista · Fintech en América Latina y el Caribe (IV informe, 2024; datos 2023, cuadro 11)",
      "url": "https://colcapital.org/wp-content/uploads/2024/07/VC-Fintech_Latam_BID_Finnovista.pdf"
    },
    "fintechs_bid": {
      "n": 26,
      "anio": 2023,
      "fuente": "BID/Finnovista · Fintech en América Latina y el Caribe (IV informe, 2024; datos 2023, cuadro 11)",
      "url": "https://colcapital.org/wp-content/uploads/2024/07/VC-Fintech_Latam_BID_Finnovista.pdf"
    },
    "segmentos": [],
    "segmentos_fuente": null,
    "ley_fintech": {
      "estado": "no hay",
      "norma": null,
      "nombre": null,
      "anio": null,
      "detalle": "No verificado en esta ronda.",
      "url": null
    },
    "reguladores": [
      {
        "nombre": "Banco Central de Bolivia",
        "sigla": "BCB",
        "url": "https://www.bcb.gob.bo/"
      },
      {
        "nombre": "Autoridad de Supervisión del Sistema Financiero",
        "sigla": "ASFI",
        "url": "https://www.asfi.gob.bo/"
      }
    ],
    "sandbox": {
      "estado": "no hay",
      "norma": null,
      "nombre": null,
      "anio": null,
      "detalle": "No verificado.",
      "url": null
    },
    "open_finance": {
      "estado": "no hay",
      "norma": null,
      "nombre": null,
      "anio": null,
      "detalle": "No verificado.",
      "url": null
    },
    "riel_inmediato": {
      "nombre": null,
      "operador": null,
      "lanzamiento": null,
      "usuarios_m": null,
      "llaves_m": null,
      "tx_mes_m": null,
      "tx_dia_m": null,
      "fecha_dato": null,
      "detalle": "No verificado.",
      "fuente": null,
      "url": null
    },
    "cripto": {
      "regimen": "sin marco",
      "norma": null,
      "detalle": "No verificado.",
      "url": null
    },
    "gremio": {
      "nombre": null,
      "miembros": null,
      "url": null
    },
    "lideres": [],
    "inclusion": {
      "cuenta_pct": 56.8,
      "pago_digital_pct": 43.6,
      "fuente": "Global Findex 2025 (datos 2024) · Banco Mundial API (source=28)",
      "url": "https://api.worldbank.org/v2/country/BOL/indicator/account.t.d?source=28&format=json&mrv=1"
    },
    "poblacion_adulta_m": 8.9,
    "notas": "Panel parcial: solo Findex, población y conteo BID (26 fintechs en 2023). Prensa de 2026 reporta migración de la banca a criptoactivos bajo norma del BCB por escasez de dólares (sin URL verificada)."
  },
  {
    "code": "PY",
    "nombre": "Paraguay",
    "flag": "🇵🇾",
    "fintechs": {
      "n": 30,
      "anio": 2023,
      "fuente": "BID/Finnovista · Fintech en América Latina y el Caribe (IV informe, 2024; datos 2023, cuadro 11)",
      "url": "https://colcapital.org/wp-content/uploads/2024/07/VC-Fintech_Latam_BID_Finnovista.pdf"
    },
    "fintechs_bid": {
      "n": 30,
      "anio": 2023,
      "fuente": "BID/Finnovista · Fintech en América Latina y el Caribe (IV informe, 2024; datos 2023, cuadro 11)",
      "url": "https://colcapital.org/wp-content/uploads/2024/07/VC-Fintech_Latam_BID_Finnovista.pdf"
    },
    "segmentos": [],
    "segmentos_fuente": null,
    "ley_fintech": {
      "estado": "no hay",
      "norma": null,
      "nombre": null,
      "anio": null,
      "detalle": "No verificado en esta ronda.",
      "url": null
    },
    "reguladores": [
      {
        "nombre": "Banco Central del Paraguay",
        "sigla": "BCP",
        "url": "https://www.bcp.gov.py/"
      }
    ],
    "sandbox": {
      "estado": "no hay",
      "norma": null,
      "nombre": null,
      "anio": null,
      "detalle": "No verificado.",
      "url": null
    },
    "open_finance": {
      "estado": "no hay",
      "norma": null,
      "nombre": null,
      "anio": null,
      "detalle": "No verificado.",
      "url": null
    },
    "riel_inmediato": {
      "nombre": null,
      "operador": null,
      "lanzamiento": null,
      "usuarios_m": null,
      "llaves_m": null,
      "tx_mes_m": null,
      "tx_dia_m": null,
      "fecha_dato": null,
      "detalle": "No verificado.",
      "fuente": null,
      "url": null
    },
    "cripto": {
      "regimen": "sin marco",
      "norma": null,
      "detalle": "No verificado.",
      "url": null
    },
    "gremio": {
      "nombre": null,
      "miembros": null,
      "url": null
    },
    "lideres": [],
    "inclusion": {
      "cuenta_pct": 60.9,
      "pago_digital_pct": 55.5,
      "fuente": "Global Findex 2025 (datos 2024) · Banco Mundial API (source=28)",
      "url": "https://api.worldbank.org/v2/country/PRY/indicator/account.t.d?source=28&format=json&mrv=1"
    },
    "poblacion_adulta_m": 5,
    "notas": "Panel parcial: 30 fintechs (BID 2023); 61 % de adultos con cuenta. En 2026 se discute regular la tokenización de activos (sin URL verificada)."
  },
  {
    "code": "SV",
    "nombre": "El Salvador",
    "flag": "🇸🇻",
    "fintechs": {
      "n": 27,
      "anio": 2023,
      "fuente": "BID/Finnovista · Fintech en América Latina y el Caribe (IV informe, 2024; datos 2023, cuadro 11)",
      "url": "https://colcapital.org/wp-content/uploads/2024/07/VC-Fintech_Latam_BID_Finnovista.pdf"
    },
    "fintechs_bid": {
      "n": 27,
      "anio": 2023,
      "fuente": "BID/Finnovista · Fintech en América Latina y el Caribe (IV informe, 2024; datos 2023, cuadro 11)",
      "url": "https://colcapital.org/wp-content/uploads/2024/07/VC-Fintech_Latam_BID_Finnovista.pdf"
    },
    "segmentos": [],
    "segmentos_fuente": null,
    "ley_fintech": {
      "estado": "no hay",
      "norma": null,
      "nombre": null,
      "anio": null,
      "detalle": "No verificado en esta ronda.",
      "url": null
    },
    "reguladores": [
      {
        "nombre": "Banco Central de Reserva",
        "sigla": "BCR",
        "url": "https://www.bcr.gob.sv/"
      }
    ],
    "sandbox": {
      "estado": "no hay",
      "norma": null,
      "nombre": null,
      "anio": null,
      "detalle": "No verificado.",
      "url": null
    },
    "open_finance": {
      "estado": "no hay",
      "norma": null,
      "nombre": null,
      "anio": null,
      "detalle": "No verificado.",
      "url": null
    },
    "riel_inmediato": {
      "nombre": null,
      "operador": null,
      "lanzamiento": null,
      "usuarios_m": null,
      "llaves_m": null,
      "tx_mes_m": null,
      "tx_dia_m": null,
      "fecha_dato": null,
      "detalle": "No verificado.",
      "fuente": null,
      "url": null
    },
    "cripto": {
      "regimen": "regulado",
      "norma": "Ley Bitcoin (2021), reformada en ene-2025 por el acuerdo con el FMI",
      "detalle": "Bitcoin dejó de ser de aceptación obligatoria en 2025 (no verificado con URL en esta ronda).",
      "url": null
    },
    "gremio": {
      "nombre": null,
      "miembros": null,
      "url": null
    },
    "lideres": [],
    "inclusion": {
      "cuenta_pct": 43.4,
      "pago_digital_pct": 28,
      "fuente": "Global Findex 2025 (datos 2024) · Banco Mundial API (source=28)",
      "url": "https://api.worldbank.org/v2/country/SLV/indicator/account.t.d?source=28&format=json&mrv=1"
    },
    "poblacion_adulta_m": 4.8,
    "notas": "Panel parcial: 27 fintechs (BID 2023); 43 % con cuenta. Cinco años de la Ley Bitcoin (sep-2026) con adopción baja y respaldo del FMI condicionado (sin URL verificada)."
  },
  {
    "code": "HN",
    "nombre": "Honduras",
    "flag": "🇭🇳",
    "fintechs": {
      "n": 18,
      "anio": 2023,
      "fuente": "BID/Finnovista · Fintech en América Latina y el Caribe (IV informe, 2024; datos 2023, cuadro 11)",
      "url": "https://colcapital.org/wp-content/uploads/2024/07/VC-Fintech_Latam_BID_Finnovista.pdf"
    },
    "fintechs_bid": {
      "n": 18,
      "anio": 2023,
      "fuente": "BID/Finnovista · Fintech en América Latina y el Caribe (IV informe, 2024; datos 2023, cuadro 11)",
      "url": "https://colcapital.org/wp-content/uploads/2024/07/VC-Fintech_Latam_BID_Finnovista.pdf"
    },
    "segmentos": [],
    "segmentos_fuente": null,
    "ley_fintech": {
      "estado": "no hay",
      "norma": null,
      "nombre": null,
      "anio": null,
      "detalle": "No verificado en esta ronda.",
      "url": null
    },
    "reguladores": [
      {
        "nombre": "Comisión Nacional de Bancos y Seguros",
        "sigla": "CNBS",
        "url": "https://www.cnbs.gob.hn/"
      }
    ],
    "sandbox": {
      "estado": "no hay",
      "norma": null,
      "nombre": null,
      "anio": null,
      "detalle": "No verificado.",
      "url": null
    },
    "open_finance": {
      "estado": "no hay",
      "norma": null,
      "nombre": null,
      "anio": null,
      "detalle": "No verificado.",
      "url": null
    },
    "riel_inmediato": {
      "nombre": null,
      "operador": null,
      "lanzamiento": null,
      "usuarios_m": null,
      "llaves_m": null,
      "tx_mes_m": null,
      "tx_dia_m": null,
      "fecha_dato": null,
      "detalle": "No verificado.",
      "fuente": null,
      "url": null
    },
    "cripto": {
      "regimen": "sin marco",
      "norma": null,
      "detalle": "No verificado.",
      "url": null
    },
    "gremio": {
      "nombre": null,
      "miembros": null,
      "url": null
    },
    "lideres": [],
    "inclusion": {
      "cuenta_pct": 42.4,
      "pago_digital_pct": 30,
      "fuente": "Global Findex 2025 (datos 2024) · Banco Mundial API (source=28)",
      "url": "https://api.worldbank.org/v2/country/HND/indicator/account.t.d?source=28&format=json&mrv=1"
    },
    "poblacion_adulta_m": 7.7,
    "notas": "Panel parcial: 18 fintechs (BID 2023); 42 % con cuenta y 30 % con pagos digitales."
  },
  {
    "code": "VE",
    "nombre": "Venezuela",
    "flag": "🇻🇪",
    "fintechs": {
      "n": 17,
      "anio": 2023,
      "fuente": "BID/Finnovista · Fintech en América Latina y el Caribe (IV informe, 2024; datos 2023, cuadro 11)",
      "url": "https://colcapital.org/wp-content/uploads/2024/07/VC-Fintech_Latam_BID_Finnovista.pdf"
    },
    "fintechs_bid": {
      "n": 17,
      "anio": 2023,
      "fuente": "BID/Finnovista · Fintech en América Latina y el Caribe (IV informe, 2024; datos 2023, cuadro 11)",
      "url": "https://colcapital.org/wp-content/uploads/2024/07/VC-Fintech_Latam_BID_Finnovista.pdf"
    },
    "segmentos": [],
    "segmentos_fuente": null,
    "ley_fintech": {
      "estado": "no hay",
      "norma": null,
      "nombre": null,
      "anio": null,
      "detalle": "No verificado en esta ronda.",
      "url": null
    },
    "reguladores": [
      {
        "nombre": "Banco Central de Venezuela",
        "sigla": "BCV",
        "url": "https://www.bcv.org.ve/"
      }
    ],
    "sandbox": {
      "estado": "no hay",
      "norma": null,
      "nombre": null,
      "anio": null,
      "detalle": "No verificado.",
      "url": null
    },
    "open_finance": {
      "estado": "no hay",
      "norma": null,
      "nombre": null,
      "anio": null,
      "detalle": "No verificado.",
      "url": null
    },
    "riel_inmediato": {
      "nombre": null,
      "operador": null,
      "lanzamiento": null,
      "usuarios_m": null,
      "llaves_m": null,
      "tx_mes_m": null,
      "tx_dia_m": null,
      "fecha_dato": null,
      "detalle": "No verificado.",
      "fuente": null,
      "url": null
    },
    "cripto": {
      "regimen": "sin marco",
      "norma": null,
      "detalle": "No verificado.",
      "url": null
    },
    "gremio": {
      "nombre": null,
      "miembros": null,
      "url": null
    },
    "lideres": [],
    "inclusion": {
      "cuenta_pct": 87.3,
      "pago_digital_pct": 75.5,
      "fuente": "Global Findex 2025 (datos 2024) · Banco Mundial API (source=28)",
      "url": "https://api.worldbank.org/v2/country/VEN/indicator/account.t.d?source=28&format=json&mrv=1"
    },
    "poblacion_adulta_m": 21.4,
    "notas": "Panel parcial: 17 fintechs (BID 2023); Findex 2024 reporta 87 % con cuenta y 76 % con pagos digitales, reflejo de la dolarización digital. Prensa de ago-2026 habla de reapertura de licencias cripto (sin URL verificada)."
  }
];

export const HITOS: Hito[] = [
  {
    "fecha": "2026-09-01",
    "pais": "CO",
    "tipo": "licencia",
    "titulo": "Nequi opera como neobanco independiente de Bancolombia",
    "detalle": "Con 29 M de usuarios, Nequi S.A. pasa a ser compañía de financiamiento del Grupo Cibest con licencia propia.",
    "fuente": "El Colombiano",
    "url": "https://www.elcolombiano.com/negocios/nequi-neobanco-cambio-1-septiembre-2026-bancolombia-MG40466219"
  },
  {
    "fecha": "2026-09-01",
    "pais": "UY",
    "tipo": "cripto",
    "titulo": "Entra en vigor la normativa de PSAV del BCU",
    "detalle": "Desde el 1-sep-2026 los proveedores de servicios de activos virtuales deben gestionar su autorización y registro ante el BCU.",
    "fuente": "Banco Central del Uruguay",
    "url": "https://www.bcu.gub.uy/Circulares/seggci2507.pdf"
  },
  {
    "fecha": "2026-08-23",
    "pais": "DO",
    "tipo": "riel",
    "titulo": "El SGPI dominicano arrancará en el primer semestre de 2027",
    "detalle": "El BCRD detalla el Sistema de Gestión de Pagos Instantáneos: acreditación en ~10 segundos, 24/7/365 y conexión de proveedores de pago no bancarios.",
    "fuente": "Diario Libre · BCRD",
    "url": "https://www.diariolibre.com/economia/finanzas/2026/08/23/nuevo-sistema-de-pagos-instantaneos-en-rd-arrancara-en-2027/3637010"
  },
  {
    "fecha": "2026-08-20",
    "pais": "CR",
    "tipo": "riel",
    "titulo": "BCCR prepara SINPE Móvil con QR y alias",
    "detalle": "El Banco Central anuncia que sumará códigos QR y alias al riel de transferencias por celular para reducir el uso de efectivo.",
    "fuente": "El Observador CR",
    "url": "https://observador.cr/banco-central-prepara-sinpe-movil-con-qr-y-alias-para-reducir-pagos-en-efectivo/"
  },
  {
    "fecha": "2026-08-13",
    "pais": "PE",
    "tipo": "riel",
    "titulo": "Perú supera 200 millones de transacciones interoperables al mes",
    "detalle": "Hito de la Estrategia de Interoperabilidad del BCRP (Yape, Plin, cajas y fintechs); aun así, el 80 % de los pagos sigue siendo en efectivo.",
    "fuente": "Infobae Perú",
    "url": "https://www.infobae.com/peru/2026/08/13/peru-supera-los-200-millones-de-transacciones-interoperables-al-mes-pero-el-80-de-los-pagos-aun-son-en-efectivo/"
  },
  {
    "fecha": "2026-08-13",
    "pais": "BR",
    "tipo": "mercado",
    "titulo": "Nubank llega a ~118 millones de clientes en Brasil",
    "detalle": "Resultados del 2T-2026: actividad mensual >86 % y utilidad trimestral superior a US$1.000 M por primera vez.",
    "fuente": "Nu Holdings (comunicado 2T-2026)",
    "url": "https://international.nubank.com.br/pt-br/companhia/nu-holdings-ltd-divulga-resultados-financeiros-do-segundo-trimestre-de-2026/"
  },
  {
    "fecha": "2026-08-10",
    "pais": "BR",
    "tipo": "riel",
    "titulo": "Relatório de Gestão do Pix 2023-2025: ~80.000 M de transacciones en 2025",
    "detalle": "Pix movió más de R$35 billones en 2025; 148 M de personas y 12,8 M de empresas lo usaron y hay >920 M de llaves; el BCB proyecta evoluciones hasta 2030.",
    "fuente": "Banco Central do Brasil",
    "url": "https://www.bcb.gov.br/detalhenoticia/21227/nota"
  },
  {
    "fecha": "2026-08-07",
    "pais": "BR",
    "tipo": "cripto",
    "titulo": "Res. BCB 584: retención preventiva antifraude en activos virtuales",
    "detalle": "Las PSAV deberán retener hasta 24 h las transferencias >US$10.000 hacia exchanges del exterior o autocustodia, ampliando la Res. 142/2021.",
    "fuente": "Banco Central do Brasil",
    "url": "https://www.bcb.gov.br/detalhenoticia/21224/nota"
  },
  {
    "fecha": "2026-07-16",
    "pais": "UY",
    "tipo": "cripto",
    "titulo": "Circular BCU 2507: marco definitivo para PSAV",
    "detalle": "La SSF del BCU incorpora a los proveedores de servicios de activos virtuales a la Recopilación de Normas del Mercado de Valores; rige desde el 1-sep-2026 con ventana de autorización hasta el 31-mar-2027.",
    "fuente": "Banco Central del Uruguay",
    "url": "https://www.bcu.gub.uy/Comunicaciones/Paginas/Detalle-Noticia.aspx?noticia=527&title=El-BCU-aprueba-normativa-para-proveedores-de-servicios-de-activos-virtuales"
  },
  {
    "fecha": "2026-07-10",
    "pais": "MX",
    "tipo": "licencia",
    "titulo": "CNBV autoriza a Nu México a operar como banco",
    "detalle": "Con más de 15 M de clientes, Nu pasa de Sofipo a institución de banca múltiple, el banco digital más grande del país.",
    "fuente": "Merca2.0 · Nu",
    "url": "https://www.merca20.com/nu-mexico-recibe-autorizacion-para-iniciar-operaciones-como-banco-que-significa-eso-para-sus-clientes/"
  },
  {
    "fecha": "2026-07-06",
    "pais": "PE",
    "tipo": "regulacion",
    "titulo": "SBS aprueba el reglamento de Banking as a Service",
    "detalle": "Res. SBS 01747-2026: bancos y emisores de dinero electrónico podrán prestar su infraestructura a fintechs y terceros para ofrecer cuentas, créditos y pagos.",
    "fuente": "Infobae Perú",
    "url": "https://www.infobae.com/peru/2026/07/06/adios-a-los-bancos-sbs-aprueba-nuevo-reglamento-baas-y-usuarios-en-peru-podran-solicitar-creditos-desde-fintech-y-apps/"
  },
  {
    "fecha": "2026-06-24",
    "pais": "CO",
    "tipo": "riel",
    "titulo": "Bre-B supera los 108 millones de llaves",
    "detalle": "A ocho meses del lanzamiento: ~35 M de usuarios y más de 1.000 M de transacciones acumuladas.",
    "fuente": "La República / Banco de la República",
    "url": "https://www.larepublica.co/especiales/revolucion-de-los-pagos-que-conecta-al-pais/el-despliegue-de-bre-b-desde-su-lanzamiento-ya-tiene-108-millones-de-llaves-registradas-4425135"
  },
  {
    "fecha": "2026-06-20",
    "pais": "CO",
    "tipo": "cripto",
    "titulo": "Archivado el PL 510/2025 de criptoactivos",
    "detalle": "Cuarto intento fallido de regular a los PSAV en Colombia; el mercado queda sin regulación integral mientras la DIAN exigirá reportes desde el año gravable 2026.",
    "fuente": "Cámara de Representantes · Portafolio",
    "url": "https://www.camara.gov.co/servicios-activos-virtuales-497/"
  },
  {
    "fecha": "2026-06-19",
    "pais": "MX",
    "tipo": "riel",
    "titulo": "Banxico homologa la experiencia de transferencias móviles (SPEI, CoDi, DiMo)",
    "detalle": "Circular 9/2026: bancos y participantes indirectos deben estandarizar los flujos de transferencia en apps antes del 14-dic-2026.",
    "fuente": "El Financiero",
    "url": "https://www.elfinanciero.com.mx/economia/2026/06/19/haces-transferencias-desde-tu-celular-banxico-cambia-las-reglas-para-spei-codi-y-dimo/"
  },
  {
    "fecha": "2026-06-19",
    "pais": "BR",
    "tipo": "riel",
    "titulo": "Pix por aproximación deja de tener tope fijo de R$500",
    "detalle": "Instrução Normativa BCB 746: los pagos por aproximación y la Jornada Sin Redirección del Open Finance siguen los límites gestionados por el usuario.",
    "fuente": "Banco Central do Brasil",
    "url": "https://www.bcb.gov.br/detalhenoticia/21169/nota"
  },
  {
    "fecha": "2026-06-12",
    "pais": "PA",
    "tipo": "regulacion",
    "titulo": "SBP participa en el taller GAFILAT sobre fintech y ALA/CFT",
    "detalle": "La Superintendencia de Bancos de Panamá se acerca al sector fintech en un taller regional de GAFILAT sobre nuevas tecnologías y prevención de lavado.",
    "fuente": "Superintendencia de Bancos de Panamá",
    "url": "https://www.superbancos.gob.pa/node/1731"
  },
  {
    "fecha": "2026-06-10",
    "pais": "AR",
    "tipo": "cripto",
    "titulo": "CNV RG 1150/2026 amplía la tokenización y prorroga el sandbox a 2027",
    "detalle": "Se admite la representación digital de valores negociables con oferta pública automática y se extiende el sandbox regulatorio hasta el 31-dic-2027 ('Big Bang regulatorio').",
    "fuente": "Boletín Oficial / argentina.gob.ar",
    "url": "https://www.boletinoficial.gob.ar/detalleAviso/primera/343010/20260611"
  },
  {
    "fecha": "2026-06-02",
    "pais": "GT",
    "tipo": "regulacion",
    "titulo": "Guatemala aprueba nueva ley antilavado (Decreto 15-2026)",
    "detalle": "El Congreso aprueba la Ley Integral contra el Lavado de Dinero para evitar la lista gris del GAFI; la SIB elabora el reglamento antes de la evaluación de GAFILAT de 2027.",
    "fuente": "Prensa Libre",
    "url": "https://www.prensalibre.com/economia/guatemala-entra-en-fase-de-reglamentacion-de-la-ley-antilavado-antes-de-evaluacion-internacional/"
  },
  {
    "fecha": "2026-06-01",
    "pais": "CL",
    "tipo": "open-finance",
    "titulo": "NCG 569: la CMF fija las reglas técnicas y la vigencia del SFA en julio de 2027",
    "detalle": "Modifica la NCG 514 e incorpora el Anexo Técnico N°3 (estándares de API) para el Sistema de Finanzas Abiertas.",
    "fuente": "CMF (PDF)",
    "url": "https://www.cmfchile.cl/normativa/ncg_569_2026.pdf"
  },
  {
    "fecha": "2026-05-07",
    "pais": "CL",
    "tipo": "licencia",
    "titulo": "Ley Fintec: 42 startups registradas ante la CMF",
    "detalle": "Recuento del registro de prestadores de servicios financieros mientras un diputado exige celeridad en la implementación de las finanzas abiertas.",
    "fuente": "El Ecosistema Startup",
    "url": "https://ecosistemastartup.com/ley-fintech-chile-2026-42-startups-registradas-y-plazos-cmf/"
  },
  {
    "fecha": "2026-05-05",
    "pais": "DO",
    "tipo": "riel",
    "titulo": "BCRD anuncia nueva tecnología para pagos al instante",
    "detalle": "El gobernador Valdez Albizu adelanta que el sistema de pagos instantáneos estará plenamente operativo en 2027, año del 80 aniversario del banco.",
    "fuente": "Diario Libre",
    "url": "https://www.diariolibre.com/economia/finanzas/2026/05/05/bcrd-implementara-nueva-tecnologia-para-pagos-al-instante/3524109"
  },
  {
    "fecha": "2026-04-30",
    "pais": "AR",
    "tipo": "riel",
    "titulo": "BCRA: 731,5 millones de transferencias inmediatas en marzo",
    "detalle": "Las transferencias push en pesos crecen 25,6 % i.a. y los pagos con QR interoperable 66,9 %; las cuentas de pago llegan a 69,6 M.",
    "fuente": "BCRA · Informe de Pagos Minoristas",
    "url": "https://www.bcra.gob.ar/publicaciones/informe-de-pagos-minoristas-marzo-de-2026/"
  },
  {
    "fecha": "2026-04-27",
    "pais": "PE",
    "tipo": "riel",
    "titulo": "BCRP fija para fines de 2026 el piloto de TAPP",
    "detalle": "La plataforma pública de pagos inmediatos (Transferencias Automáticas de Pagos), inspirada en UPI, arrancará en fase piloto a fines de 2026.",
    "fuente": "Infobae Perú",
    "url": "https://www.infobae.com/peru/2026/04/27/fin-del-monopolio-de-las-apps-bancarias-bcr-lanzara-tapp-la-plataforma-para-pagar-con-un-solo-clic-a-fines-del-2026/"
  },
  {
    "fecha": "2026-04-07",
    "pais": "CO",
    "tipo": "open-finance",
    "titulo": "Decreto 0368/2026: finanzas abiertas obligatorias",
    "detalle": "Minhacienda modifica el Decreto 2555/2010 y obliga a las entidades vigiladas por la SFC a compartir datos con consentimiento; reemplaza el esquema voluntario de 2022.",
    "fuente": "Superintendencia Financiera de Colombia",
    "url": "https://www.superfinanciera.gov.co/publicaciones/10116081/finanzas-abiertas-obligatorias-impulsaran-el-desarrollo-del-sistema-y-la-inclusion-financiera-en-el-pais/"
  },
  {
    "fecha": "2026-03-30",
    "pais": "UY",
    "tipo": "regulacion",
    "titulo": "El BCU presenta su plan de modernización de pagos",
    "detalle": "ISO 20022, sistema de pagos rápidos 24/7 interoperable y esquema de finanzas abiertas como ejes del plan.",
    "fuente": "Open Hub News",
    "url": "https://openhubnews.com/ln-uruguay-pisa-el-acelerador-fintech-con-innovacion-desde-el-bcu/"
  },
  {
    "fecha": "2026-02-24",
    "pais": "MX",
    "tipo": "mercado",
    "titulo": "Finnovista Radar México 2026: 795 fintechs locales y 316 extranjeras",
    "detalle": "El ecosistema entra en fase de consolidación: 77 % usa IA, 80 % colabora con bancos y la mortalidad es de 5 %.",
    "fuente": "Finnosummit (PDF)",
    "url": "https://www.finnosummit.com/wp-content/uploads/2026/02/Finnovista_Fintech_Radar_Mexico_2026.pdf"
  },
  {
    "fecha": "2026-01-05",
    "pais": "BR",
    "tipo": "open-finance",
    "titulo": "Portabilidad de crédito vía Open Finance",
    "detalle": "Res. Conjunta 15 y Res. CMN 5.265/2025 habilitan portar operaciones de crédito por el ecosistema de open finance.",
    "fuente": "Banco Central do Brasil",
    "url": "https://www.bcb.gov.br/detalhenoticia/20991/nota"
  },
  {
    "fecha": "2025-12-07",
    "pais": "BR",
    "tipo": "riel",
    "titulo": "Pix marca récord de 313 millones de transacciones en un día",
    "detalle": "Pico histórico diario en diciembre de 2025; no es un promedio (el promedio de 2025 ronda los 220 M/día).",
    "fuente": "Times Brasil",
    "url": "https://timesbrasil.com.br/brasil/pix-bate-recorde-e-supera-310-milhoes-de-transacoes-em-um-unico-dia"
  },
  {
    "fecha": "2025-12-06",
    "pais": "PE",
    "tipo": "regulacion",
    "titulo": "BCRP aprueba nuevo Reglamento del Sistema Nacional de Pagos",
    "detalle": "La Circular 0022-2025-BCRP fija estándares de interoperabilidad, transparencia tarifaria y seguridad para todos los actores; rige desde abril de 2026.",
    "fuente": "Gan@Más",
    "url": "https://revistaganamas.com.pe/bcrp-aprueba-nuevo-reglamento-del-sistema-nacional-de-pagos-con-su-vigencia-desde-abril-de-2026/"
  },
  {
    "fecha": "2025-12-04",
    "pais": "CL",
    "tipo": "open-finance",
    "titulo": "La CMF aplaza a 2027 el Sistema de Finanzas Abiertas",
    "detalle": "La Comisión pone en consulta una nueva norma y corre un año (de jul-2026 a jul-2027) la entrada en vigencia del SFA.",
    "fuente": "Latam Fintech Hub",
    "url": "https://www.latamfintech.co/articles/la-comision-para-el-mercado-financiero-en-chile-aplaza-la-entrada-en-vigencia-del-sistema-de-finanzas-abiertas-en-y-pone-en-consulta-nueva-norma"
  },
  {
    "fecha": "2025-11-15",
    "pais": "PE",
    "tipo": "mercado",
    "titulo": "Yape alcanza 15,5 millones de usuarios activos mensuales",
    "detalle": "Credicorp reporta el hito de la billetera del BCP, que concentra la mayor parte de los pagos interoperables del país.",
    "fuente": "Business Empresarial",
    "url": "https://www.businessempresarial.com.pe/yape-alcanzo-los-15-5-millones-de-usuarios-activos-mensuales-segun-credicorp/"
  },
  {
    "fecha": "2025-11-10",
    "pais": "BR",
    "tipo": "cripto",
    "titulo": "Resoluciones BCB 519, 520 y 521: marco para PSAV",
    "detalle": "El BCB reglamenta la Ley 14.478/2022: autorización, conducta y régimen cambiario para prestadoras de servicios de activos virtuales; vigencia desde feb-2026.",
    "fuente": "Banco Central do Brasil",
    "url": "https://www.bcb.gov.br/estabilidadefinanceira/exibenormativo?tipo=Resolu%C3%A7%C3%A3o%20BCB&numero=519"
  },
  {
    "fecha": "2025-11-04",
    "pais": "BR",
    "tipo": "cripto",
    "titulo": "El BCB apaga la plataforma blockchain del Drex",
    "detalle": "La próxima fase del real digital prioriza casos de uso (garantías, crédito) sin tecnología de registro distribuido; el piloto DLT se desconecta.",
    "fuente": "O Globo",
    "url": "https://oglobo.globo.com/economia/tecnologia/noticia/2025/11/04/banco-central-decide-desligar-plataforma-blockchain-do-drex.ghtml"
  },
  {
    "fecha": "2025-10-09",
    "pais": "CO",
    "tipo": "riel",
    "titulo": "Bre-B inicia operaciones interoperables 24/7",
    "detalle": "El sistema de pagos inmediatos del Banco de la República entra en operación; en ocho meses superará los 1.000 M de transacciones.",
    "fuente": "La República / Banco de la República",
    "url": "https://www.larepublica.co/especiales/revolucion-de-los-pagos-que-conecta-al-pais/el-despliegue-de-bre-b-desde-su-lanzamiento-ya-tiene-108-millones-de-llaves-registradas-4425135"
  },
  {
    "fecha": "2025-09-30",
    "pais": "BR",
    "tipo": "riel",
    "titulo": "Pix tendrá botón de contestación antifraude",
    "detalle": "El BCB anuncia el Mecanismo Especial de Devolución integrado en las apps para reportar fraudes en Pix.",
    "fuente": "Banco Central do Brasil",
    "url": "https://www.bcb.gov.br/detalhenoticia/20865/nota"
  },
  {
    "fecha": "2025-08-14",
    "pais": "BR",
    "tipo": "open-finance",
    "titulo": "Open Finance Brasil cumple 5 años con 100 M de autorizaciones",
    "detalle": "El ecosistema conecta 65 M de cuentas y mueve ~R$1,2 mil millones al mes en pagos iniciados vía open finance.",
    "fuente": "Banco Central do Brasil",
    "url": "https://www.bcb.gov.br/detalhenoticia/20800/nota"
  },
  {
    "fecha": "2025-07-14",
    "pais": "CO",
    "tipo": "riel",
    "titulo": "Arranca el registro de llaves de Bre-B",
    "detalle": "Los usuarios pueden inscribir llaves (celular, cédula, correo, alfanumérica) en más de 30 entidades antes del inicio de operaciones del riel del Banco de la República.",
    "fuente": "Banco de la República",
    "url": "https://www.banrep.gov.co/en/news/july-users-register-bre-b-aliases"
  },
  {
    "fecha": "2025-07-08",
    "pais": "CO",
    "tipo": "mercado",
    "titulo": "Finnovista Radar Colombia 2025: 410 fintechs locales",
    "detalle": "El ecosistema triplicó ingresos en cuatro años; 4 de cada 10 soluciones son extranjeras y los pagos digitales duplicaron su valor hasta USD 28.000 M.",
    "fuente": "Finnosummit",
    "url": "https://www.finnosummit.com/en/radar/the-maturity-of-fintech-in-colombia-the-sector-has-tripled-its-revenue-in-four-years-and-now-exceeds-400-local-companies/"
  },
  {
    "fecha": "2025-06-30",
    "pais": "EC",
    "tipo": "regulacion",
    "titulo": "Ecuador aprueba el marco de sandboxes regulatorios",
    "detalle": "Res. JPRF-T-2025-0156 habilita espacios controlados de prueba; a marzo de 2026 no se había recibido ninguna solicitud.",
    "fuente": "Asobanca (PDF) · Ecuador Brief",
    "url": "https://asobanca.org.ec/wp-content/uploads/2025/06/Resolucion-No.-JPRF-T-2025-0156-Sandboxes-regulatorios.pdf"
  },
  {
    "fecha": "2025-06-04",
    "pais": "BR",
    "tipo": "riel",
    "titulo": "BCB anuncia el Pix Automático para el 16 de junio",
    "detalle": "El débito recurrente vía Pix (suscripciones, servicios) queda disponible desde el 16-jun-2025, anunciado en el evento Conexão Pix.",
    "fuente": "Banco Central do Brasil",
    "url": "https://www.bcb.gov.br/detalhenoticia/20713/nota"
  },
  {
    "fecha": "2025-05-23",
    "pais": "AR",
    "tipo": "open-finance",
    "titulo": "Decreto 353/2025 crea el Sistema de Finanzas Abiertas",
    "detalle": "El Ejecutivo instituye un SFA de adhesión voluntaria, con estándares a definir por el BCRA y la CNV, junto con un régimen simplificado de Ganancias.",
    "fuente": "Boletín Oficial",
    "url": "https://www.boletinoficial.gob.ar/detalleAviso/primera/325041/20250523"
  },
  {
    "fecha": "2025-05-21",
    "pais": "EC",
    "tipo": "regulacion",
    "titulo": "Ecuador: las fintech deberán constituirse como sociedades anónimas",
    "detalle": "La Junta de Política y Regulación Financiera expide la Res. JPRF-F-2025-0155, que reglamenta la Ley Fintech y exige la forma de S.A. a las empresas de servicios financieros tecnológicos.",
    "fuente": "Primicias (PDF de la resolución)",
    "url": "https://www.primicias.ec/uploads/files/2025/05/21/REsolucion-fintech.pdf"
  }
];
